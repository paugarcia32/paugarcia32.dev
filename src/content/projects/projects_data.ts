export interface Project {
  name: string;
  description: string;
  technologies: string[];
  image: string;
  url: string;
  scenario: string;
  problem: string;
  goals: string[];
  role: string;
}

export const projects: Project[] = [
  {
    name: "TrafficFlow AI",
    description:
      "Developed during the HackBCN hackathon, this project is a vehicle radar that detects traffic jams and analyzes real-time data using the YOLOv10 model.",
    technologies: ["Python", "NextJS", "YOLOv10", "TeamWork"],
    image: "/Projects/TrafficFlowIABanner.png",
    url: "https://www.hackbarna.com/en/projects/TrafficFlow_AI",
    scenario:
      "This project was developed during the HackBCN event, where we had only 30 hours to create an AI-based solution with a team of 3 members.",
    problem:
      "The main challenge was the limited time available. Since I had not worked on any AI projects before this hackathon, it was quite challenging to learn how to develop this type of project.",
    goals: [
      "Learn to handle the pressure of tight deadlines",
      "Learn how to integrate AI into a project",
    ],
    role: "My main role was to implement the YOLOv10 model to detect the number of cars in a predefined area. I was also responsible for creating the frontend client to showcase our work.",
  },

  {
    name: "IoT Real-Time Sensoring",
    description:
      "Developed during the HackUPC hackathon, this project is a real-time sensorization application.",
    technologies: ["Python", "Flutter", "ESP32", "TeamWork"],
    image: "/Projects/IoTReal-TimeSensoringBanner.png",
    url: "https://github.com/CisHighLevel",
    scenario:
      "This project was developed during the HackUPC event, where we had only one weekend to create a tech project with a team of 4 members.",
    problem:
      "The main issue was using the WiFi Arduino library, as it required some pins that we were using for the sensors. I spent too many hours resolving this problem.",
    goals: [
      "Develop a full-stack application",
      "Handle real-time data using Grafana dashboards",
    ],
    role: "My main role was to develop all the sensor functionality on the ESP32 microcontroller.",
  },

  {
    name: "EETAC GO",
    description:
      "Mobile app developed by a team of 5 members as part of university coursework.",
    technologies: ["Express.js", "Flutter", "MongoDB", "Teamwork"],
    image: "/Projects/EetacGoBanner.png",
    url: "https://github.com/paugarcia32/EETAC-GO",
    scenario:
      "This was a full-semester university project where we created a full-stack application as a team of 5 members.",
    problem:
      "The main problem was my lack of prior experience with Flutter applications. I spent many hours dealing with syntax errors and learning how to use different widgets.",
    goals: [
      "Learn mobile full-stack development",
      "Learn to work with Agile methodologies",
      "Learn how to work with git flows",
    ],
    role: "My main role was developing the Flutter client.",
  },

  {
    name: "RSA Server",
    description:
      "Full-stack web app that implements RSA keys on server and client.",
    technologies: ["Express.js", "Angular", "Teamwork"],
    image: "/Projects/RSABanner.jpg",
    url: "https://github.com/paugarcia32/RSA-Client-Server",
    scenario:
      "This was a university project where we created a full-stack application as a team of three members.",
    problem:
      "The main problem was dealing with the 'BigInt' types for the RSA keys. Since they are not a common type in TypeScript, it was difficult to work with them.",
    goals: [
      "Learn how RSA works in a real scenario.",
      "Implement RSA methods securely.",
      "Learn how to create a custom JavaScript module and implement it in the project.",
    ],
    role: "My main role was developing the logic behind the key exchange in the Angular project and assisting with the creation of the RSA module.",
  },
  {
    name: "Planet Survivor",
    description:
      "Mobile game developed by a team of 3 members as part of university coursework.",
    technologies: ["Java", "Unity", "MariaDB", "Teamwork"],
    image: "/Projects/PlannetSurvivorBanner.png",
    url: "https://github.com/MikelArinaMarcos/dsaProjectG6",
    scenario:
      "This project was developed over a semester as a university project with a team of 3 members.",
    problem:
      "One of the biggest challenges was that it was my first time developing a REST API, and it was also my first Java project.",
    goals: [
      "Learn how to use Unity for game development",
      "Learn how to create Android applications",
    ],
    role: "My main role was as a backend developer.",
  },

  {
    name: "CLI Password Cracker",
    description:
      "A CLI-based application designed to crack passwords using a dictionary attack.",
    technologies: ["Rust", "CLI"],
    image: "/Projects/PasswordCrackerBanner.jpg",
    url: "https://github.com/paugarcia32/CLI-Password-Cracker",
    scenario:
      "This project was my first foray into Rust programming. I aimed to create a command-line tool to understand dictionary-based password attacks.",
    problem:
      "As it was my initial experience with Rust, I faced challenges with syntax and performance optimization. Implementing efficient handling of large wordlists was a key hurdle.",
    goals: [
      "Learn Rust programming fundamentals",
      "Understand dictionary-based password attacks and their implementation",
    ],
    role: "I was responsible for developing the core password-cracking functionality and optimizing performance in Rust.",
  },

  {
    name: "CLI Password Generator",
    description:
      "A CLI-based application that generates secure, random passwords.",
    technologies: ["Rust", "CLI"],
    image: "/Projects/PasswordGeneratorBanner.png",
    url: "https://github.com/paugarcia32/CLI-Password-Generator",
    scenario:
      "This project was another early Rust project where I aimed to build a CLI tool for generating strong, random passwords to enhance user security.",
    problem:
      "The main challenge was ensuring the randomness and security of the generated passwords while learning to handle Rust's syntax and libraries.",
    goals: [
      "Develop a secure password generator using Rust",
      "Understand the implementation of randomness in programming",
    ],
    role: "I developed the password generation algorithm and designed the CLI interface to ensure usability and security.",
  },

  {
    name: "Quantum Circuits",
    description: "Simple quantum circuits that use Hadamard and Pauli gates.",
    technologies: ["Python", "Qiskit"],
    image: "/Projects/QiskitBanner.png",
    url: "https://github.com/paugarcia32/Quantum-Circuits-with-Qiskit",
    scenario:
      "This project was completed as part of a Quantum Computing course at my university.",
    problem:
      "The main challenge was using the Qiskit library due to the differences in function types across versions of the library.",
    goals: [
      "Implement Hadamard and Pauli gates in a quantum circuit.",
      "Learn how to use the Qiskit library.",
    ],
    role: "My main role was to design, develop, and document the entire project.",
  },

  {
    name: "BME280 Sensor with 0.96 OLED Display and ESP32",
    description:
      "A custom temperature and humidity indicator using the BME280 sensor, displayed on a 0.96-inch OLED screen with an ESP32 microcontroller.",
    technologies: ["Arduino", "C++", "ESP32"],
    image: "/Projects/BME280Banner.png",
    url: "https://github.com/paugarcia32/ESP-32-with-BME280-and-0.96OLED",
    scenario:
      "This was my first project involving ESP32 microcontrollers. I aimed to create a real-time environmental monitoring system using a BME280 sensor and an OLED display.",
    problem:
      "The main challenge was integrating the BME280 sensor with the ESP32, especially since it was my first time working with these microcontrollers. Ensuring accurate readings and handling calibration were key difficulties.",
    goals: [
      "Learn to work with ESP32 microcontrollers",
      "Develop skills in integrating sensors with displays",
    ],
    role: "I handled the sensor integration with the ESP32, implemented data processing, and managed the display output for real-time monitoring.",
  },

  {
    name: "MQTT Pub/Sub Server with ESP32 and Raspberry Pi",
    description:
      "A custom MQTT-based publish/subscribe mechanism for communication between an ESP32 microcontroller and a Raspberry Pi.",
    technologies: ["Raspberry Pi", "MQTT", "ESP32"],
    image: "/Projects/MQTTBanner.png",
    url: "https://github.com/paugarcia32/ESP32-MQTT-pub-sub",
    scenario:
      "This was my first experience with MQTT and IoT communication using ESP32 and Raspberry Pi. The project involved setting up an MQTT broker for reliable communication between devices.",
    problem:
      "The primary challenge was configuring the MQTT broker and ensuring reliable communication between the ESP32 and Raspberry Pi, especially as this was my first IoT project with these components.",
    goals: [
      "Understand MQTT protocol and its application in IoT",
      "Develop skills in setting up and managing IoT communication between devices",
    ],
    role: "I was responsible for configuring the MQTT broker, implementing the publish/subscribe logic, and ensuring smooth communication between the ESP32 and Raspberry Pi.",
  },
];
