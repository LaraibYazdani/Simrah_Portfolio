---
title: "Is Your Business Liable for What Your AI Says? The Air Canada Ruling, Explained"
shortTitle: "Is Your Business Liable for What Your AI Says? The Air Canada Ruling, Explained"
section: blogs
order: 2
publication: Nexivo
platform: Blog
date: "2026-09-16"
dateLabel: "Sept 16, 2026"
audiences: [business-owners]
note: "Turns a legal ruling into a checklist a business can act on."
takeaway: "When your AI speaks to a customer, your company is speaking."
startHere: true
url: "https://nexivoai.co/blog/ai-chatbot-liability"
---

**Quick answer.** Yes, that’s the direction the clearest ruling so far points, and every business putting an AI in front of customers should know the case. In *Moffatt v. Air Canada* (2024), a Canadian tribunal made the airline pay for a refund policy its website chatbot invented, and rejected, in writing, the argument that the bot was “a separate legal entity responsible for its own actions.” The damages were about CA$812. The principle doesn’t scale with the dollar amount: when your AI speaks to a customer, your company is speaking. Below: what happened, why it matters far more now that AI acts instead of just talking, and the four-part spec the ruling hands you for free.

## What actually happened

The facts are sad and ordinary. In November 2022, Jake Moffatt’s grandmother died. Booking last-minute flights on Air Canada’s website, he asked the site’s chatbot about bereavement fares. Per the tribunal’s decision as reported by CBC, the bot told him to book now and claim the reduced bereavement rate within 90 days of the ticket being issued. So he booked roughly CA$1,200 in full-fare tickets, flew, grieved, and applied for the refund.

Except the policy the chatbot described did not exist. Air Canada’s real policy, on a different page of the same website, said reduced rates don’t apply to completed travel. Refund denied. Moffatt had the screenshot, and he took it to the British Columbia Civil Resolution Tribunal.

## The defense that should be studied in business schools

Here’s where the case earns its place in every AI conversation. Air Canada’s argument, and this comes straight from the decision, not a critic’s paraphrase, was that the chatbot was “a separate legal entity responsible for its own actions.”

Sit with that. The airline’s own bot, on the airline’s own website, answering questions about the airline’s own policies, presented as an independent being whose mistakes belonged to no one.

The tribunal’s response was almost dry: Air Canada “does not explain why it believes that is the case.” It found the airline owed its customers a duty of care, had failed to take reasonable care that its chatbot was accurate, and was liable for negligent misrepresentation. And it added the sentence that should be taped above every AI deployment plan: there is no reason a customer should have to know that one section of your website is accurate and another is not.

Air Canada paid CA$650.88 in damages plus interest and fees, about CA$812 all in. A rounding error for an airline. One of the most quietly important AI rulings anywhere.

## Why this matters more in 2026 than it did in 2024

The Air Canada bot only talked. It described a policy, wrongly, in text, and that alone created liability.

Now look at what businesses deploy today, ours included. AI agents answer the phone in your company’s voice, quote prices out loud to callers who are reasonably writing them down, book appointments, and describe cancellation policies at 7 PM. Every utterance is a representation made by your business, under a precedent that already rejected the only escape hatch anyone has tried.

The math worth internalizing: the cost of one wrong promise didn’t change. The number of promises went up a thousandfold. An AI receptionist takes hundreds of calls a month, each holding several small commitments. If your agent improvises even occasionally, you’re not running a chatbot risk; you’re running a portfolio of it.

## The wrong conclusion, and the right one

The lazy takeaway is “AI is a legal time bomb; avoid it.” Wrong twice: the phone still needs answering, the missed-call math is brutal in the other direction, and humans misquote policies too; you just can’t pull their transcript afterward, which makes the human version harder to audit, not safer.

The right takeaway is that the ruling hands you a specification. Read as an engineering document, *Moffatt* says a customer-facing AI needs four things:

**1. Grounding in your actual documents, not improvisation.** The Air Canada bot’s failure mode was inventing a plausible-sounding policy. An agent should answer refund, pricing, and policy questions from your rate card, your written rules, your source of truth, and nothing else. If it isn’t in the documents, it isn’t in the agent’s mouth.

**2. A trained “I don’t know.”** The bot’s fatal flaw wasn’t ignorance; it was confident ignorance. The most underrated feature in customer-facing AI is the graceful escalation: “I don’t want to misquote that, let me have someone confirm it for you.” That single behavior converts your largest legal exposure into a callback.

**3. Confirm-first on anything that binds you.** Custom prices, exceptions, consequential bookings, the moves that commit your business should surface for human approval before they’re final. We’ve long described confirm-first as a trust feature; *Moffatt* reframes it as liability control. The approval step is precisely where “the AI said it” becomes “we said it, deliberately.”

**4. Transcripts as standard equipment.** The irony: the chat log is what sank Air Canada; Moffatt had the screenshot. For a well-run agent, the same logging is protection: audit what’s being promised weekly, catch a drifting answer early, and when a dispute arrives, know exactly what was said.

## The honest caveats

Is one small-claims tribunal in British Columbia binding law for your business? Almost certainly not. It’s persuasive, not precedential; the award was $812, not a headline fine; and courts elsewhere could draw different lines. European commentary expects similar outcomes under EU consumer law, but “expects” is doing real work in that sentence.

What we’d bet on isn’t the case law; it’s the direction. No tribunal, no regulator, and no customer anywhere is drifting toward “the bot said it, so it doesn’t count.” Build for the direction, not the loophole.

## A two-minute test worth running today

Open whatever AI currently speaks for your business and ask it three things: your refund policy, your cancellation fees, and something you don’t offer.

If it answers from your real documents, escalates what it doesn’t know, and you can pull the transcript afterward, good; that’s the spec. If it produces something plausible and confident that you’ve never actually promised, you now know what Jake Moffatt knew before Air Canada did. And unlike Air Canada, you found out for free.

## The bottom line

Eight hundred dollars bought the industry its clearest sentence yet: a company is responsible for its AI the way it’s responsible for its website and its front desk. That’s not a reason to keep AI away from customers; it’s the reason to insist any AI facing them is grounded, humble at its edges, approval-gated on the consequential, and logged to the word.
