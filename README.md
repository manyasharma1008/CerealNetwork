# CerealNetwork

A decentralized, fault-tolerant platform for coordinating community food sharing locations. Mycelium Network provides real-time inventory visibility for community fridges, little free pantries, and food distribution points, enabling efficient resource allocation and reducing food waste.

## 🎯 The Problem

Community food sharing initiatives face critical coordination challenges:
- **Inefficient distribution**: Donors lack visibility into what supplies are needed where
- **Wasted resources**: Volunteers spend time checking locations that are already stocked
- **Information gaps**: People in need travel to empty distribution points
- **Centralized failure points**: Existing solutions rely on single servers that can fail

## 💡 Our Solution

Mycelium Network creates a resilient, community-owned coordination system that:
- **Tracks real-time inventory** across all connected food sharing locations
- **Provides multiple access points** via web app and SMS for maximum accessibility
- **Uses decentralized technology** to ensure system resilience and community ownership
- **Implements consensus mechanisms** to maintain data accuracy without central authority

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern UI framework with TypeScript
- **Leaflet** / **Mapbox GL JS** - Interactive mapping
- **Gun.js** - P2P database synchronization

### Backend & Infrastructure
- **Gun.js** - Decentralized graph database
- **Node.js** / **Express** - SMS webhook processing
- **Twilio API** - SMS gateway for low-tech access

### Deployment
- **Vercel** / **Netlify** - Frontend hosting
- **Railway** / **Heroku** - Peer server deployment
- **Twilio** - SMS service provider

## 🚀 Key Features

### Real-Time Map Interface
- Visual status indicators (Green/Yellow/Red) for quick assessment
- Interactive pins showing detailed inventory levels
- Live updates across all connected clients

### Multi-Modal Access
- **Web App**: Full-featured interface for smartphones and computers
- **SMS Gateway**: Text-based updates for basic phones and quick reporting
- **Syntax**: `#FRIDGE12 PRODUCE LOW` or `#LOCATION5 NEEDS BREAD`

### Decentralized Architecture
- **No single point of failure** - Data syncs peer-to-peer
- **Community ownership** - No central corporation controls the data
- **Offline resilience** - Local data persists during connectivity issues

### Trust & Verification System
- **Consensus-based validation** - Multiple reports required for status changes
- **User reputation scoring** - Trusted users have higher voting power
- **Conflict resolution** - Automatic flagging of contradictory reports

## 📋 Installation & Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Twilio account (for SMS features)
