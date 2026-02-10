# Eurusys Contract Management App

A modern Contract Management Platform built using **React + TypeScript + Vite**.  
This application allows users to create reusable blueprints, generate contracts, and manage the full contract lifecycle with controlled state transitions.

---

## 🚀 Features

### 📄 Blueprint Management
- Create, edit, and delete contract blueprints
- Dynamic field support (Text, Date, Checkbox, Signature)
- Reusable structure for multiple contracts

### 📝 Contract Generation
- Generate contracts from selected blueprints
- Fill contract-specific data
- Store and manage multiple contracts

### 🔄 Contract Lifecycle Management
Contracts follow a strict state transition:

Created → Approved → Sent → Signed → Locked  
            ↘  
           Revoked  

#### Rules:
- Cannot skip lifecycle steps
- Locked contracts cannot be edited
- Revoked contracts cannot move forward
- UI only enables valid actions

### 📊 Dashboard View
- View contracts in tabular format
- Filter/group by status
- See key details:
  - Contract Name
  - Blueprint Name
  - Status
  - Created Date
- Perform lifecycle actions directly from dashboard

---

## 🛠 Tech Stack

- Frontend: React
- Language: TypeScript
- Build Tool: Vite
- State Management: React Context API
- Version Control: Git & GitHub

---

## 📁 Project Structure

