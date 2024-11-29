# Generative AI QnA Bot

## Overview

The **Generative AI QnA Bot** is a web-based application built using React, designed to allow users to select topics (Geography, Health, Sports) and generate questions based on their selected topic. It leverages Google Generative AI's Gemini API to generate questions and then allows users to submit answers. The answers are evaluated by the same AI to provide feedback on the accuracy, completeness, and relevance of the responses.

This project demonstrates how AI can be used for educational purposes by providing dynamic question-answering functionality, which is powered by a **Generative AI Model**.

## Features

- **Topic Selection**: Choose from **Geography**, **Health**, or **Sports** as the subject for generating questions.
- **Question Generation**: Dynamically generate questions based on the selected topic using Google’s Generative AI API.
- **Answer Evaluation**: Evaluate the user’s answer to the generated question and get a detailed assessment of the answer's accuracy.
- **User-friendly Interface**: A clean, interactive interface for an optimal user experience.

## Technologies Used

- **Frontend**: React.js, CSS (Tailwind or standard CSS)
- **Backend (AI Service)**: Google Generative AI API (Gemini Pro model)
- **Authentication**: GitHub and Google APIs
- **Version Control**: Git, GitHub for repository management

## Installation

Follow these steps to set up the project locally:

### Prerequisites

- Node.js installed (preferably the latest LTS version).
- npm or yarn package manager.
- A Google Cloud account to get access to the Generative AI API (You will need the API key).
  
### Steps to Run the Project Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/harryongit/generative-ai-qna-bot.git
