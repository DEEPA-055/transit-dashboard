export interface TransitMetric {
  routeId: string;
  routeName: string;
  type: 'Bus' | 'Metro' | 'Rail';
  ridership: number[]; // Hourly data for 24h
  avgDelay: number; // in minutes
  carbonSaved: number; // kg CO2
  congestionLevel: 'Low' | 'Moderate' | 'High' | 'Severe';
  status: 'On Time' | 'Delayed' | 'Disrupted';
  path?: { lat: number; lng: number }[];
  prediction?: {
    nextHour: number;
    trend: 'Increasing' | 'Decreasing' | 'Stable';
    confidence: number;
  };
}

export interface CityData {
  id: string;
  name: string;
  metrics: {
    totalRiders: number;
    avgWaitTime: number;
    efficiencyScore: number;
    costMultiplier: number; // City-specific multiplier for infrastructure costs
  };
  routes: TransitMetric[];
}

export const CITIES: CityData[] = [
  {
    id: 'delhi',
    name: 'Delhi NCR',
    metrics: {
      totalRiders: 6500000,
      avgWaitTime: 4,
      efficiencyScore: 94,
      costMultiplier: 1.55, // Delhi NCR complexity and high land cost
    },
    routes: [
      {
        routeId: 'DL-BLUE',
        routeName: 'Blue Line (Dwarka - Noida/Vaishali)',
        type: 'Metro',
        ridership: [
          42000, 22000, 12000, 8000, 35000, 145000, 210000, 245000, 230000, 185000,
          155000, 145000, 150000, 165000, 195000, 230000, 255000, 275000, 210000, 145000,
          95000, 65000, 52000, 42000
        ], // Sum approximates ~2.08M daily journeys (2024 report)
        avgDelay: 2,
        carbonSaved: 165000,
        congestionLevel: 'High',
        status: 'On Time',
        path: [
          { lat: 28.6139, lng: 77.2090 },
          { lat: 28.6200, lng: 77.2200 },
          { lat: 28.6250, lng: 77.2400 },
          { lat: 28.6300, lng: 77.2600 },
          { lat: 28.6200, lng: 77.2900 },
          { lat: 28.5800, lng: 77.3100 },
          { lat: 28.5700, lng: 77.3200 },
          { lat: 28.5600, lng: 77.3400 }
        ],
        prediction: { nextHour: 235000, trend: 'Decreasing', confidence: 91 }
      },
      {
        routeId: 'DL-YELLOW',
        routeName: 'Yellow Line (Samaypur Badli - HUDA City)',
        type: 'Metro',
        ridership: [
          45000, 24000, 14000, 9000, 38000, 155000, 220000, 255000, 240000, 195000,
          165000, 155000, 160000, 175000, 210000, 245000, 270000, 290000, 225000, 155000,
          105000, 75000, 58000, 45000
        ], // Sum approximates ~2.1M daily journeys
        avgDelay: 1,
        carbonSaved: 185000,
        congestionLevel: 'High',
        status: 'On Time',
        prediction: { nextHour: 245000, trend: 'Decreasing', confidence: 93 }
      },
      {
        routeId: 'DL-RED',
        routeName: 'Red Line (Rithala - Shaheed Sthal)',
        type: 'Metro',
        ridership: [
          8000, 4000, 2000, 1500, 6000, 40000, 85000, 120000, 110000, 80000,
          65000, 60000, 62000, 70000, 85000, 110000, 125000, 130000, 100000, 65000,
          35000, 20000, 12000, 8000
        ],
        avgDelay: 4,
        carbonSaved: 22000,
        congestionLevel: 'Moderate',
        status: 'On Time',
        prediction: { nextHour: 115000, trend: 'Stable', confidence: 88 }
      },
      {
        routeId: 'DL-MAGENTA',
        routeName: 'Magenta Line (Janakpuri W - Botanical)',
        type: 'Metro',
        ridership: [
          6000, 3000, 1500, 1000, 5000, 30000, 65000, 90000, 85000, 60000,
          50000, 45000, 48000, 55000, 65000, 85000, 95000, 100000, 80000, 50000,
          25000, 15000, 8000, 6000
        ],
        avgDelay: 2,
        carbonSaved: 18000,
        congestionLevel: 'Moderate',
        status: 'On Time',
        prediction: { nextHour: 82000, trend: 'Increasing', confidence: 90 }
      },
      {
        routeId: 'DL-DTC-534',
        routeName: 'DTC 534 (Mehrauli - Anand Vihar)',
        type: 'Bus',
        ridership: [
          500, 200, 100, 200, 1200, 4500, 8500, 12000, 11000, 8000,
          6500, 6000, 6300, 7500, 9000, 12000, 13500, 15000, 11000, 6000,
          3000, 1500, 800, 500
        ],
        avgDelay: 22,
        carbonSaved: 3500,
        congestionLevel: 'Severe',
        status: 'Delayed',
        prediction: { nextHour: 13000, trend: 'Decreasing', confidence: 75 }
      }
    ],
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    metrics: {
      totalRiders: 7600000,
      avgWaitTime: 8,
      efficiencyScore: 82,
      costMultiplier: 1.95, // Highest cost city due to island geography and population density
    },
    routes: [
      {
        routeId: 'MUM-WEST',
        routeName: 'Western Line (Churchgate - Dahanu)',
        type: 'Rail',
        ridership: [
          65000, 32000, 22000, 28000, 95000, 280000, 345000, 385000, 320000, 210000,
          165000, 155000, 160000, 185000, 235000, 290000, 335000, 375000, 265000, 165000,
          95000, 65000, 52000, 42000
        ], // Sum approximates ~2.7M daily journeys (2024 July report)
        avgDelay: 12,
        carbonSaved: 225000,
        congestionLevel: 'Severe',
        status: 'Delayed',
        path: [
          { lat: 18.9322, lng: 72.8264 },
          { lat: 18.9500, lng: 72.8200 },
          { lat: 18.9700, lng: 72.8250 },
          { lat: 19.0178, lng: 72.8478 },
          { lat: 19.0596, lng: 72.8400 },
          { lat: 19.1136, lng: 72.8400 },
          { lat: 19.2288, lng: 72.8562 },
          { lat: 19.4563, lng: 72.7925 }
        ],
        prediction: { nextHour: 310000, trend: 'Decreasing', confidence: 85 }
      },
      {
        routeId: 'MUM-CEN',
        routeName: 'Central Line (CSMT - Kalyan/Kasara)',
        type: 'Rail',
        ridership: [
          85000, 42000, 32000, 38000, 125000, 365000, 445000, 495000, 415000, 285000,
          225000, 210000, 215000, 245000, 305000, 385000, 445000, 495000, 365000, 245000,
          145000, 105000, 85000, 75000
        ], // Sum approximates ~3.7M daily journeys (CR report)
        avgDelay: 15,
        carbonSaved: 285000,
        congestionLevel: 'Severe',
        status: 'Delayed',
        prediction: { nextHour: 410000, trend: 'Decreasing', confidence: 82 }
      },
      {
        routeId: 'MUM-HAR',
        routeName: 'Harbour Line (CSMT - Panvel)',
        type: 'Rail',
        ridership: [
          15000, 8000, 5000, 12000, 52000, 180000, 320000, 480000, 410000, 280000,
          190000, 170000, 185000, 230000, 310000, 420000, 530000, 610000, 420000, 250000,
          110000, 62000, 35000, 18000
        ],
        avgDelay: 8,
        carbonSaved: 68000,
        congestionLevel: 'High',
        status: 'On Time',
        prediction: { nextHour: 500000, trend: 'Decreasing', confidence: 88 }
      },
      {
        routeId: 'MUM-METRO-1',
        routeName: 'Metro 1 (Versova - Ghatkopar)',
        type: 'Metro',
        ridership: [
          4000, 2000, 1000, 2500, 12000, 45000, 85000, 120000, 110000, 85000,
          60000, 55000, 58000, 72000, 95000, 125000, 145000, 160000, 110000, 55000,
          25000, 12000, 7000, 4000
        ],
        avgDelay: 2,
        carbonSaved: 22000,
        congestionLevel: 'Moderate',
        status: 'On Time',
        prediction: { nextHour: 130000, trend: 'Stable', confidence: 95 }
      }
    ],
  },
  {
    id: 'bangalore',
    name: 'Bangalore',
    metrics: {
      totalRiders: 4800000, // Metro + BMTC
      avgWaitTime: 14,
      efficiencyScore: 78,
      costMultiplier: 1.40, // High-tech infra and severe road congestion
    },
    routes: [
      {
        routeId: 'BLR-PURPLE',
        routeName: 'Purple Line (Whitefield - Challaghatta)',
        type: 'Metro',
        ridership: [
          15000, 8000, 5000, 8500, 28000, 55000, 75000, 85000, 72000, 55000,
          45000, 42000, 46000, 52000, 65000, 75000, 82000, 88000, 65000, 42000,
          28000, 18000, 12000, 10000
        ], // Sum approximates ~1M peak-day journeys for the line
        avgDelay: 4,
        carbonSaved: 85000,
        congestionLevel: 'Moderate',
        status: 'On Time',
        prediction: { nextHour: 75000, trend: 'Decreasing', confidence: 91 }
      },
      {
        routeId: 'BLR-GREEN',
        routeName: 'Green Line (Nagasandra - Silk Institute)',
        type: 'Metro',
        ridership: [
          12000, 6000, 3500, 6500, 22000, 45000, 65000, 75000, 62000, 48000,
          38000, 35000, 38000, 45000, 55000, 65000, 72000, 78000, 55000, 35000,
          22000, 14000, 9000, 8000
        ], // ~0.8M daily
        avgDelay: 3,
        carbonSaved: 68000,
        congestionLevel: 'Moderate',
        status: 'On Time',
        prediction: { nextHour: 62000, trend: 'Decreasing', confidence: 89 }
      },
      {
        routeId: 'BLR-BMTC-500K',
        routeName: 'BMTC 500K (Banashankari - ITPL)',
        type: 'Bus',
        ridership: [
          8000, 4000, 2500, 3500, 18000, 45000, 85000, 125000, 95000, 65000,
          55000, 52000, 58000, 75000, 95000, 135000, 155000, 175000, 115000, 65000,
          35000, 22000, 15000, 8000
        ], // High volume ORR line
        avgDelay: 45,
        carbonSaved: 42000,
        congestionLevel: 'Severe',
        status: 'Delayed',
        prediction: { nextHour: 155000, trend: 'Increasing', confidence: 78 }
      }
    ],
  },
  {
    id: 'chennai',
    name: 'Chennai',
    metrics: {
      totalRiders: 2800000,
      avgWaitTime: 10,
      efficiencyScore: 85,
      costMultiplier: 1.25,
    },
    routes: [
      {
        routeId: 'CHN-METRO-1',
        routeName: 'Blue Line (Airport - Wimco Nagar)',
        type: 'Metro',
        ridership: [
          8000, 4000, 2000, 3500, 12000, 45000, 95000, 145000, 130000, 95000,
          80000, 75000, 78000, 95000, 120000, 155000, 190000, 215000, 145000, 80000,
          40000, 20000, 12000, 8000
        ],
        avgDelay: 2,
        carbonSaved: 18000,
        congestionLevel: 'Moderate',
        status: 'On Time',
        path: [
          { lat: 12.9800, lng: 80.1600 },
          { lat: 13.0067, lng: 80.2206 },
          { lat: 13.0400, lng: 80.2500 },
          { lat: 13.0600, lng: 80.2700 },
          { lat: 13.0827, lng: 80.2707 },
          { lat: 13.1100, lng: 80.2800 }
        ],
        prediction: { nextHour: 155000, trend: 'Decreasing', confidence: 93 }
      },
      {
        routeId: 'CHN-MTC-21G',
        routeName: 'MTC 21G (Broadway - Tambaram)',
        type: 'Bus',
        ridership: [
          1500, 800, 400, 800, 3500, 12000, 28000, 45000, 42000, 32000,
          28000, 26000, 28000, 35000, 42000, 52000, 58000, 65000, 45000, 25000,
          12000, 6000, 3000, 1500
        ],
        avgDelay: 25,
        carbonSaved: 5200,
        congestionLevel: 'Severe',
        status: 'Delayed',
        prediction: { nextHour: 48000, trend: 'Increasing', confidence: 80 }
      },
    ],
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    metrics: {
      totalRiders: 2500000,
      avgWaitTime: 9,
      efficiencyScore: 88,
      costMultiplier: 1.15,
    },
    routes: [
      {
        routeId: 'HYD-RED',
        routeName: 'Red Line (Miyapur - LB Nagar)',
        type: 'Metro',
        ridership: [
          10000, 5000, 2000, 4000, 15000, 55000, 115000, 185000, 165000, 130000,
          110000, 95000, 100000, 125000, 155000, 195000, 225000, 245000, 165000, 95000,
          45000, 25000, 15000, 10000
        ],
        avgDelay: 2,
        carbonSaved: 26000,
        congestionLevel: 'Moderate',
        status: 'On Time',
        prediction: { nextHour: 180000, trend: 'Decreasing', confidence: 92 }
      },
    ],
  },
  {
    id: 'kochi',
    name: 'Kochi',
    metrics: {
      totalRiders: 800000,
      avgWaitTime: 6,
      efficiencyScore: 92,
      costMultiplier: 1.10,
    },
    routes: [
      {
        routeId: 'KOCHI-M',
        routeName: 'Kochi Metro Line 1 (Aluva - Petta)',
        type: 'Metro',
        ridership: [
          3000, 1500, 800, 1500, 5000, 18000, 38000, 62000, 55000, 42000,
          35000, 32000, 34000, 42000, 52000, 65000, 78000, 85000, 55000, 28000,
          12000, 6000, 3500, 3000
        ],
        avgDelay: 1,
        carbonSaved: 12000,
        congestionLevel: 'Low',
        status: 'On Time',
        prediction: { nextHour: 60000, trend: 'Increasing', confidence: 95 }
      },
    ],
  },
  {
    id: 'coimbatore',
    name: 'Coimbatore',
    metrics: {
      totalRiders: 1200000,
      avgWaitTime: 15,
      efficiencyScore: 70,
      costMultiplier: 1.05,
    },
    routes: [
      {
        routeId: 'CBE-BUS-1',
        routeName: 'TNSTC Town Bus 1C (Gandhipuram - Vadavalli)',
        type: 'Bus',
        ridership: [
          1200, 600, 400, 800, 3500, 10000, 25000, 42000, 38000, 30000,
          24000, 22000, 25000, 32000, 38000, 45000, 52000, 58000, 42000, 22000,
          10000, 6000, 3000, 1200
        ],
        avgDelay: 14,
        carbonSaved: 4200,
        congestionLevel: 'High',
        status: 'Delayed',
        prediction: { nextHour: 45000, trend: 'Decreasing', confidence: 84 }
      },
    ],
  },
];
