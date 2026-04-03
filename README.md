# Small Task Manager

A simple command-line task manager built with JavaScript and Node.js.

This project lets you manage tasks from the terminal. You can add, edit, complete, uncomplete, delete, and list tasks, and everything is saved in a local `tasks.json` file so your tasks stay available between runs.

## Features

- Add new tasks
- Prevent duplicate task titles
- Edit existing tasks
- Delete tasks
- Mark tasks as completed
- Mark tasks as pending again
- Show all tasks
- Show only completed tasks
- Show only pending tasks
- Clear all tasks
- Clear only completed tasks
- Save tasks using JSON file storage
- Store task creation date

## Project Structure

```text
Small-Task-Manager/
├── main.js
├── storage.js
├── taskManager.js
├── tasks.json
└── README.md

## Requirements

- Node.js installed on your computer

## Installation

Clone the repository:

git clone https://github.com/Lukanoid/Small-Task-Manager.git
cd Small-Task-Manager

## Usage

Run the app with:

node main.js help

## Example Workflow

node main.js add "Gym"
node main.js add "Study JavaScript"
node main.js list
node main.js complete 1
node main.js completed
node main.js pending
node main.js edit 2 "Study Node.js"
node main.js clear-completed

##How It Works

- main.js handles terminal commands
- taskManager.js contains the main task logic
- storage.js handles reading from and writing to tasks.json
- tasks.json stores the saved tasks

## Future Improvements

- Add unit tests
- Add task priorities
- Add due dates
- Add search by title
- Add sorting options
- Convert it into an interactive CLI app

## Author

Created by Vasil Stamboliiski