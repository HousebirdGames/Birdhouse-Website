# Birdhouse Framework Documentation

Welcome to the Birdhouse Framework documentation repository. This repository contains the source files necessary to generate and view the documentation website for the Birdhouse Framework locally.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Before setting up the project, ensure you have the following installed on your system:
- A server software like XAMPP to serve the documentation locally (Download XAMPP from [Apache Friends](https://www.apachefriends.org/index.html))
- OPTIONAL: Node.js (Download and install from [Node.js official website](https://nodejs.org/))

### Generating the Documentation (Optional; Requires Node.js)

The repository should contain a docs folder which contains all files neccessary for the documentation website. If you ever update the Birdhouse Framework of the Documentation Website, you can regenerate the documentation files to be up to date too.

1. **Clone the Repository**

   Start by cloning this repository to your local machine using (if you haven't already):

   ```bash
   git clone https://github.com/HousebirdGames/Birdhouse-Website
   cd Birdhouse-Website
   ```

2. **Install Dependencies**

   Run the following command to install the necessary dependencies:

   ```bash
   npm install
   ```

   This command installs all the packages required to generate the documentation.

3. **Generate the Documentation**

   Once the dependencies are installed, you can regenerate the documentation by running:

   ```bash
   node documentation.js
   ```

   This script processes the source files and produces the documentation files.

### Further Information

For more details on how to deploy Birdhouse applications and more extensive configuration options, refer to the generated documentation itself. Hopefully it can aid you in leveraging the full capabilities of the Birdhouse Framework.

## Contact

You can write an email to [contact@housebird.games](mailto:contact@housebird.games).

Project Link: [https://github.com/HousebirdGames/Birdhouse-Website](https://github.com/HousebirdGames/Birdhouse-Website)