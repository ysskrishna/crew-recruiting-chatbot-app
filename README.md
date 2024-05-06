# Chatbot Full Stack Challenge
This document specifies a simple ai-human chat server which you're going to implement. This is intended to showcase your technical competence with HTML, CSS, and React.js, databases, oauth and row level security.

We want a web application that mimics chatgpt in nearly every way but one: If one user has a link to another user's chat (which you can access via the share button), that user should be able to "fork" the conversation and continue it.

## Simplifications
You do not need to use the OpenAI/other llm api. You should create a backend call that returns a random string of text 200 characters long.
You do not need to handle the displaying of markdown by the chatbot.
You can assume that your user is running an up-to-date version of chrome.

## Requirements
The user should be able to log-in and register with the same button with google and with github.
Unless a conversation has been shared, other users should not be able to see it.
You should copy chatgpt's style as closely as possible.
You should figure out how to host your project yourself for free. No special domain names needed. You do not need to document your work significantly.
Please demonstrate usage of RLS.

## Submission
Your code should be executable by running "./run.sh." This file should be no longer than 15 lines.
Include a short readme that explains any quirks, and any extra requirements for running your application, and gives a brief walkthrough of the code.
Feel free to ask any questions!
