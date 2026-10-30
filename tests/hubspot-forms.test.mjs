import assert from "node:assert/strict";
import { test, beforeEach } from "node:test";
import { registerHooks } from "node:module";
import { pathToFileURL } from "node:url";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/")) {
      return { url: pathToFileURL(path.join(root, "src", specifier.slice(2) + ".ts")).href, shortCircuit: true };
    }
    if (specifier === "./form-copy") {
      return { url: new URL("./form-copy.ts", context.parentURL).href, shortCircuit: true };
    }
    return nextResolve(specifier, context);
  }
});
const { POST: newsletter } = await import("../src/app/api/newsletter-signup/route.ts");
const { POST: viewing } = await import("../src/app/api/private-viewing/route.ts");
const { POST: checklist } = await import("../src/app/api/buyer-checklist/route.ts");
const { POST: benchmarkers } = await import("../src/app/api/benchmarkers-signup/route.ts");
const { HUBSPOT_FORMS } = await import("../src/lib/hubspot.ts");
let calls;
beforeEach(() => {
  calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url, ...options, payload: JSON.parse(options.body) });
    return new Response("{}", {status:200});
  };
});
function request(payload, headers = {}) {
  return new Request("https://www.criterionhomesltd.com/api/test", {
    method: "POST",
    headers: {origin:"https://www.criterionhomesltd.com", ...headers},
    body: JSON.stringify(payload),
  });
}
const person = {name:"Test Buyer",email:"test@example.com",phone:"08058573915"};
test("newsletter requires explicit opt-in and a valid email", async () => {
  assert.equal((await newsletter(request({email:"test@example.com"}))).status,400);
  assert.equal((await newsletter(request({email:"bad",marketingConsent:true}))).status,400);
  assert.equal(calls.length,0);
});
test("newsletter uses its form and records the actual consent", async () => {
  const res = await newsletter(request({email:" TEST@EXAMPLE.COM ",marketingConsent:true,
    pageUri:"https://www.criterionhomesltd.com/insights/example?utm_source=test",pageName:"Test article"}));
  assert.equal(res.status,200);
  assert.equal(calls.length,1);
  assert.ok(calls[0].url.endsWith(HUBSPOT_FORMS.newsletter));
  assert.deepEqual(calls[0].payload.fields,[{objectTypeId:"0-1",name:"email",value:"test@example.com"}]);
  assert.equal(calls[0].payload.legalConsentOptions.consent.communications[0].subscriptionTypeId,4013175565);
  assert.ok(!("Authorization" in calls[0].headers));
});
test("viewing keeps newsletter consent separate and normalises Nigerian phones", async () => {
  assert.equal((await viewing(request(person))).status,200);
  const p=calls[0].payload;
  assert.ok(calls[0].url.endsWith(HUBSPOT_FORMS.viewing));
  assert.equal(p.fields.find(x=>x.name==="phone").value,"+2348058573915");
  assert.deepEqual(p.legalConsentOptions.consent.communications,[]);
});
test("invalid submissions and honeypots never reach HubSpot", async () => {
  assert.equal((await viewing(request({...person,phone:"bad"}))).status,400);
  assert.equal((await newsletter(request({email:"test@example.com",marketingConsent:true,website:"spam"}))).status,400);
  assert.equal((await checklist(request({...person},{origin:"https://other.example"}))).status,403);
  assert.equal((await checklist(request([]))).status,400);
  assert.equal(calls.length,0);
});
test("email-only checklist requests work without optional name or phone", async () => {
  assert.equal((await checklist(request({email:"test@example.com"}))).status,200);
  assert.ok(calls[0].url.endsWith(HUBSPOT_FORMS.checklist));
  assert.equal(calls[0].payload.fields.length,1);
});
test("Benchmarkers preserves all preference fields and rejects invalid choices", async () => {
  const payload={...person,interest:"Homebuyer",location:"Abuja",communication:"Email",referral:"Website"};
  assert.equal((await benchmarkers(request({...payload,interest:"invalid"}))).status,400);
  assert.equal((await benchmarkers(request(payload))).status,200);
  const fields=Object.fromEntries(calls[0].payload.fields.map(x=>[x.name,x.value]));
  assert.equal(fields.benchmarker_interest,"Homebuyer");
  assert.equal(fields.benchmarker_preferred_location,"Abuja");
  assert.equal(fields.preferred_communication_channel,"Email");
  assert.equal(fields.benchmarker_referral_source,"Website");
});
test("upstream failure never produces success or an automatic retry", async () => {
  globalThis.fetch = async()=>{calls.push(1);return new Response("{}",{status:500});};
  const res=await checklist(request({email:"test@example.com"}));
  assert.equal(res.status,502);
  assert.equal(calls.length,1);
  assert.equal((await res.json()).success,undefined);
});
test("page context cannot point to an unrelated domain; existing HubSpot cookie is preserved", async () => {
  await checklist(request({email:"test@example.com",pageUri:"https://unrelated.example"},
    {cookie:"hubspotutk=0123456789abcdef0123456789abcdef"}));
  assert.equal(calls[0].payload.context.pageUri,"https://www.criterionhomesltd.com");
  assert.equal(calls[0].payload.context.hutk,"0123456789abcdef0123456789abcdef");
});
