# Trip Planner System 🌍✈️

A comprehensive Travel & Tourism planning web application built with **Angular**. The system allows users to explore destinations, register for trips, and manage bookings, while providing an Admin Dashboard for managing trip inventories.

---

### 🖼️ UI Preview
![Application Preview](./travel-app.png)

---

## 🚀 Key Features

### 👤 User Capabilities
* **Authentication Flow:** Complete Login and Registration forms.
* **Trip Explorer:** Browse all available trips with destination names, locations, and images.
* **Dynamic Booking System:** Register for specific trips with a customizable number of participants.
* **Personal Dashboard ("My Trips"):** View and manage booked trips with a "Cancel Registration" option.

### 🔐 Admin Capabilities
* **Inventory Management:** Full CRUD operations (Create, Read, Update, Delete) for trips.
* **Data Integrity Protections:** Deletion and editing are permitted only for trips without active registrants.

## 🛠️ Tech Stack
* **Frontend:** Angular (Components, Services, and Router)
* **Backend Emulation:** REST API simulated via **JSON Server**

---

## 📦 How to Run the Project (Installation & Local Setup)

To run this project locally, you need to start both the mock backend server and the Angular frontend application. Follow these steps:

### Step 1: Start the Mock Backend (JSON Server)
1. Open your terminal/command prompt.
2. If you don't have json-server installed globally, install it by running:
   ```bash
   npm install -g json-server
