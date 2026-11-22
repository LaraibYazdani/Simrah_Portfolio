---
title: "Can AI Build Your Software Alone? A New Benchmark Just Measured It"
shortTitle: "Can AI Build Your Software Alone? A New Benchmark Just Measured It"
section: blogs
order: 1
publication: SocioOn
platform: Blog
date: "2026-09-11"
dateLabel: "Sept 11, 2026"
audiences: [business-owners, engineering-leaders]
note: "Turns a research study into plain language, with the quick answer first."
takeaway: "The best AI working alone passed 23.9% of the tests. An engineer using the same AI passed 82.2%."
url: "https://socioon.org/blog/can-ai-replace-developers"
---

**Quick answer.** On September 8, Sierra released τ^τ-bench (called “hyper-tau-bench”), a public test that asks a simple question: can AI build working software from a real business’s messy files, with no engineer involved? The result: the best AI working alone passed 23.9% of the tests. An engineer using the same AI passed 82.2%. The study also explains why the AI lost those 58 points, and the reasons have nothing to do with writing code. They’re about understanding the business, talking to the client, and checking the work. In plain terms: the typing was never the hard part of software. Now there’s a number that proves it.

## What the test actually was

Most AI coding tests are neat. Here’s a bug; fix it. Here’s a spec; follow it. Real client projects never arrive like that.

Sierra built a test that looks like a real project instead. The AI gets what a real business would hand a vendor: company records spread across handbooks, spreadsheets, and old support messages. A client who knows the requirements but hasn’t written them down. A live system the software must connect to. Old code to work with. A budget.

From all that, the AI has to deliver a working customer-service agent. Then the finished software is tested against simulated customers to see if it actually does the job. Fifty-three projects, four industries.

So the question isn’t “can AI write code?” Everyone knows it can. The question is “can AI be the whole vendor?” That’s the question with money on it, and this is the first serious public measurement of it.

## The numbers

Sierra tested six AI setups, using today’s strongest models. Their scores ranged from 14.9% to 23.9%. The best was Claude Opus 5 running in Claude Code.

Then they measured a comparison point: an engineer who understood the project, working with the same kind of AI. That combination scored 82.2% on the same projects.

Same models. Same projects. The only difference was whether a human engineer was in the loop. That difference was worth 58 points.

## The three big problems (and none of them are coding)

This is the most useful part of the study. The researchers looked at why the AI failed, and the reasons form a clear list:

**1. It didn’t really understand the business.** The AI skimmed the company records instead of studying them. It ran quick, shallow searches where a human engineer would sit down and actually map out how the business works, its rules, its exceptions, its weird cases.

**2. It didn’t talk to the client.** This one is almost funny. The test includes a client who holds the requirements; you can ask them anything. The AI mostly didn’t. Human engineers spend whole discovery phases asking questions, because clients always know things that aren’t written down anywhere. The AI skipped that step and built on guesses.

**3. It didn’t check its own work properly.** The AI built software that ran. That’s not the same as right software. It rarely tested its work against the real answers, so mistakes shipped along quietly.

The researchers sum it up in one line worth remembering: building this kind of software is “a research problem rather than a conventional engineering task.” Meaning: the real work is figuring out what to build and proving it correct. The code is the easy part.

## The banking result

One more number from the study, and it’s the scariest one. The best AI setup scored differently depending on industry: 72.8% on retail, 55.9% on airlines, 48.2% on telecom, and 5.9% on banking.

Why did banking break it? The researchers counted. The banking test had 2,969 separate facts and rules the software needed to respect. The other industries had between 85 and 155. One banking task could depend on up to 580 rules at once.

Here’s why that matters to you: banking isn’t special. It’s just what a complicated business looks like: lots of rules, lots of exceptions, everything connected. If your business has real complexity, the 5.9% number is closer to your risk than the 72.8% one.

## The part most people will get wrong

The easy headline is “humans beat AI.” That’s not what happened.

Look again: the winning side also used AI. The 82.2% didn’t come from an engineer typing everything by hand. It came from an engineer who understood the business, using the same AI models.

So the real comparison is: AI alone, 23.9%. AI in the hands of an engineer, 82.2%. The study didn’t measure humans versus machines. It measured what a good engineer adds to the machine, and the answer is: more than three times the results.

## The honest caveats

Three warnings before you quote these numbers forever. First, AI scores always improve; 23.9% will go up over time. Second, Sierra sells agent-building services, so a study showing “this is hard without experts” fits their business. They open-sourced the whole test, which means anyone can check it, but keep the incentive in mind. Third, it’s one benchmark covering one kind of software.

The scores will change. What probably won’t change is the list of failures, because understanding a business, asking good questions, and verifying work don’t get easier just because models get smarter. They get easier when someone in the loop knows the business.

## What this means if you’re buying software development

- “AI will just build it” now has a real success rate: about 1 in 4 on realistic projects, and about 1 in 17 when the business is genuinely complex. Plan with those numbers.
- The vendor question has changed. Don’t ask a dev team “do you use AI?”; everyone does. Ask: “What do your engineers add to the AI?” Good answers sound like: how we run discovery, how often we talk to your team, how we test against your real data. Those three things are exactly where the AI lost its 58 points.
- Complex and regulated businesses need the human most. If your company is closer to banking than to a simple shop, unsupervised AI builds are a gamble the data now warns against.
- The winning setup is the middle one: not AI alone, not engineers without AI. Engineers who know the business, using strong AI, with proper checking. That’s what 82.2% looks like.

## The bottom line

For two years, people have argued about whether AI will replace software engineers, mostly with opinions. Now someone built the experiment, ran it, and published everything. The result: the job was never the typing. It was understanding a messy business, asking the questions nobody wrote down, and proving the software right. AI made that part the whole game.
