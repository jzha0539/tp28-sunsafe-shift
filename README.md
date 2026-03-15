# SunSense

SunSense is a youth-focused sun-safety website designed for the TP28 onboarding concept.  
The project targets young people in Victoria and focuses on UV awareness, myth correction, skin-type guidance, and practical protection advice.

## Project Goal

This build turns UV risk into clear daily actions by combining:

- live UV search by location
- current-location UV lookup
- awareness content backed by database data
- skin-type guidance linked with current UV conditions
- prevention and resource sections

## TP28 Feature Mapping

### US1.1 Localised UV Alert
Implemented in the **UV Search** page.

Features:
- choose a Victorian location
- use current device location
- fetch live UV data from an external API
- display UV level, risk label, and damage-time guidance

### US2.1 UV Impacts and Skin Myths
Implemented in the **Awareness** page.

Features:
- behaviour snapshot chart from database
- Melbourne monthly UV climatology trend from database
- myth and fact cards from database

### US2.2 Skin Tone and UV Absorption
Implemented in the **Skin Type** page.

Features:
- selectable skin-type cards
- personalised recommendation based on skin type and latest UV result
- estimated damage time from database rules

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Lucide React icons

### Backend
- Node.js
- Express

### Database
- MySQL

### External Data Source
- Open-Meteo API for live UV lookup
- BOM UV climatology data for Melbourne monthly UV trend
- AIHW / ABS references for awareness metrics

## Project Structure

```text
frontend/
  src/
    components/
    pages/
    data/
    utils/

backend/
  server.js
  db.js
  .env