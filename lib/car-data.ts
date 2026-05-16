export type CarEngine = {
  id: string
  name: string
  displacement: string
  fuelType: "gasoline" | "diesel" | "hybrid"
  recommendedOil: {
    viscosity: string
    type: string
    capacity: string
    specification: string
    productId: string
  }
  recommendedFilters: {
    oilFilter: { partNumber: string; productId: string }
    airFilter: { partNumber: string; productId: string }
    cabinFilter: { partNumber: string; productId: string }
  }
}

export type CarModel = {
  id: string
  name: string
  years: number[]
  engines: CarEngine[]
}

export type CarBrand = {
  id: string
  name: string
  nameFA: string
  logo?: string
  models: CarModel[]
}

export const carDatabase: CarBrand[] = [
  {
    id: "toyota",
    name: "Toyota",
    nameFA: "تویوتا",
    logo: "https://www.carlogos.org/car-logos/toyota-logo-2020-europe-640.png",
    models: [
      {
        id: "camry",
        name: "Camry",
        years: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
        engines: [
          {
            id: "camry-2.5",
            name: "2.5L 4-Cylinder",
            displacement: "2.5L",
            fuelType: "gasoline",
            recommendedOil: {
              viscosity: "0W-20",
              type: "Full Synthetic",
              capacity: "4.8L",
              specification: "API SN Plus, ILSAC GF-6",
              productId: "apex-elite-gt",
            },
            recommendedFilters: {
              oilFilter: { partNumber: "APX-OF-1001", productId: "filter-oil-1001" },
              airFilter: { partNumber: "APX-AF-2001", productId: "filter-air-2001" },
              cabinFilter: { partNumber: "APX-CF-3001", productId: "filter-cabin-3001" },
            },
          },
          {
            id: "camry-3.5",
            name: "3.5L V6",
            displacement: "3.5L",
            fuelType: "gasoline",
            recommendedOil: {
              viscosity: "0W-20",
              type: "Full Synthetic",
              capacity: "6.1L",
              specification: "API SN Plus, ILSAC GF-6",
              productId: "apex-elite-gt",
            },
            recommendedFilters: {
              oilFilter: { partNumber: "APX-OF-1002", productId: "filter-oil-1002" },
              airFilter: { partNumber: "APX-AF-2002", productId: "filter-air-2002" },
              cabinFilter: { partNumber: "APX-CF-3001", productId: "filter-cabin-3001" },
            },
          },
        ],
      },
      {
        id: "corolla",
        name: "Corolla",
        years: [2019, 2020, 2021, 2022, 2023, 2024],
        engines: [
          {
            id: "corolla-2.0",
            name: "2.0L 4-Cylinder",
            displacement: "2.0L",
            fuelType: "gasoline",
            recommendedOil: {
              viscosity: "0W-20",
              type: "Full Synthetic",
              capacity: "4.4L",
              specification: "API SN Plus, ILSAC GF-6",
              productId: "apex-elite-gt",
            },
            recommendedFilters: {
              oilFilter: { partNumber: "APX-OF-1003", productId: "filter-oil-1003" },
              airFilter: { partNumber: "APX-AF-2003", productId: "filter-air-2003" },
              cabinFilter: { partNumber: "APX-CF-3002", productId: "filter-cabin-3002" },
            },
          },
        ],
      },
      {
        id: "rav4",
        name: "RAV4",
        years: [2019, 2020, 2021, 2022, 2023, 2024],
        engines: [
          {
            id: "rav4-2.5",
            name: "2.5L 4-Cylinder",
            displacement: "2.5L",
            fuelType: "gasoline",
            recommendedOil: {
              viscosity: "0W-20",
              type: "Full Synthetic",
              capacity: "4.8L",
              specification: "API SN Plus, ILSAC GF-6",
              productId: "apex-elite-gt",
            },
            recommendedFilters: {
              oilFilter: { partNumber: "APX-OF-1004", productId: "filter-oil-1004" },
              airFilter: { partNumber: "APX-AF-2004", productId: "filter-air-2004" },
              cabinFilter: { partNumber: "APX-CF-3003", productId: "filter-cabin-3003" },
            },
          },
        ],
      },
    ],
  },
  {
    id: "honda",
    name: "Honda",
    nameFA: "هوندا",
    logo: "https://www.carlogos.org/car-logos/honda-logo-2000-full-640.png",
    models: [
      {
        id: "accord",
        name: "Accord",
        years: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
        engines: [
          {
            id: "accord-1.5t",
            name: "1.5L Turbo",
            displacement: "1.5L",
            fuelType: "gasoline",
            recommendedOil: {
              viscosity: "0W-20",
              type: "Full Synthetic",
              capacity: "3.7L",
              specification: "API SN Plus",
              productId: "apex-elite-gt",
            },
            recommendedFilters: {
              oilFilter: { partNumber: "APX-OF-1005", productId: "filter-oil-1005" },
              airFilter: { partNumber: "APX-AF-2005", productId: "filter-air-2005" },
              cabinFilter: { partNumber: "APX-CF-3004", productId: "filter-cabin-3004" },
            },
          },
          {
            id: "accord-2.0t",
            name: "2.0L Turbo",
            displacement: "2.0L",
            fuelType: "gasoline",
            recommendedOil: {
              viscosity: "0W-20",
              type: "Full Synthetic",
              capacity: "4.4L",
              specification: "API SN Plus",
              productId: "apex-elite-gt",
            },
            recommendedFilters: {
              oilFilter: { partNumber: "APX-OF-1006", productId: "filter-oil-1006" },
              airFilter: { partNumber: "APX-AF-2006", productId: "filter-air-2006" },
              cabinFilter: { partNumber: "APX-CF-3004", productId: "filter-cabin-3004" },
            },
          },
        ],
      },
      {
        id: "civic",
        name: "Civic",
        years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
        engines: [
          {
            id: "civic-2.0",
            name: "2.0L 4-Cylinder",
            displacement: "2.0L",
            fuelType: "gasoline",
            recommendedOil: {
              viscosity: "0W-20",
              type: "Full Synthetic",
              capacity: "3.7L",
              specification: "API SN Plus",
              productId: "apex-elite-gt",
            },
            recommendedFilters: {
              oilFilter: { partNumber: "APX-OF-1007", productId: "filter-oil-1007" },
              airFilter: { partNumber: "APX-AF-2007", productId: "filter-air-2007" },
              cabinFilter: { partNumber: "APX-CF-3005", productId: "filter-cabin-3005" },
            },
          },
        ],
      },
    ],
  },
  {
    id: "bmw",
    name: "BMW",
    nameFA: "بی‌ام‌و",
    logo: "https://www.carlogos.org/car-logos/bmw-logo-2020-blue-white-640.png",
    models: [
      {
        id: "3-series",
        name: "3 Series",
        years: [2019, 2020, 2021, 2022, 2023, 2024],
        engines: [
          {
            id: "330i",
            name: "330i 2.0L Turbo",
            displacement: "2.0L",
            fuelType: "gasoline",
            recommendedOil: {
              viscosity: "5W-40",
              type: "Full Synthetic",
              capacity: "5.25L",
              specification: "BMW LL-01, API SN",
              productId: "apex-pro-racing",
            },
            recommendedFilters: {
              oilFilter: { partNumber: "APX-OF-1008", productId: "filter-oil-1008" },
              airFilter: { partNumber: "APX-AF-2008", productId: "filter-air-2008" },
              cabinFilter: { partNumber: "APX-CF-3006", productId: "filter-cabin-3006" },
            },
          },
          {
            id: "m340i",
            name: "M340i 3.0L Turbo",
            displacement: "3.0L",
            fuelType: "gasoline",
            recommendedOil: {
              viscosity: "5W-40",
              type: "Full Synthetic",
              capacity: "6.5L",
              specification: "BMW LL-01, API SN",
              productId: "apex-pro-racing",
            },
            recommendedFilters: {
              oilFilter: { partNumber: "APX-OF-1009", productId: "filter-oil-1009" },
              airFilter: { partNumber: "APX-AF-2009", productId: "filter-air-2009" },
              cabinFilter: { partNumber: "APX-CF-3006", productId: "filter-cabin-3006" },
            },
          },
        ],
      },
      {
        id: "5-series",
        name: "5 Series",
        years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
        engines: [
          {
            id: "530i",
            name: "530i 2.0L Turbo",
            displacement: "2.0L",
            fuelType: "gasoline",
            recommendedOil: {
              viscosity: "5W-40",
              type: "Full Synthetic",
              capacity: "5.25L",
              specification: "BMW LL-01, API SN",
              productId: "apex-pro-racing",
            },
            recommendedFilters: {
              oilFilter: { partNumber: "APX-OF-1010", productId: "filter-oil-1010" },
              airFilter: { partNumber: "APX-AF-2010", productId: "filter-air-2010" },
              cabinFilter: { partNumber: "APX-CF-3007", productId: "filter-cabin-3007" },
            },
          },
        ],
      },
    ],
  },
  {
    id: "mercedes",
    name: "Mercedes-Benz",
    nameFA: "مرسدس بنز",
    logo: "https://www.carlogos.org/car-logos/mercedes-benz-logo-2011-640.png",
    models: [
      {
        id: "c-class",
        name: "C-Class",
        years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
        engines: [
          {
            id: "c300",
            name: "C300 2.0L Turbo",
            displacement: "2.0L",
            fuelType: "gasoline",
            recommendedOil: {
              viscosity: "5W-40",
              type: "Full Synthetic",
              capacity: "5.5L",
              specification: "MB 229.5, API SN",
              productId: "apex-pro-racing",
            },
            recommendedFilters: {
              oilFilter: { partNumber: "APX-OF-1011", productId: "filter-oil-1011" },
              airFilter: { partNumber: "APX-AF-2011", productId: "filter-air-2011" },
              cabinFilter: { partNumber: "APX-CF-3008", productId: "filter-cabin-3008" },
            },
          },
        ],
      },
      {
        id: "e-class",
        name: "E-Class",
        years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
        engines: [
          {
            id: "e350",
            name: "E350 2.0L Turbo",
            displacement: "2.0L",
            fuelType: "gasoline",
            recommendedOil: {
              viscosity: "5W-40",
              type: "Full Synthetic",
              capacity: "5.5L",
              specification: "MB 229.5, API SN",
              productId: "apex-pro-racing",
            },
            recommendedFilters: {
              oilFilter: { partNumber: "APX-OF-1012", productId: "filter-oil-1012" },
              airFilter: { partNumber: "APX-AF-2012", productId: "filter-air-2012" },
              cabinFilter: { partNumber: "APX-CF-3009", productId: "filter-cabin-3009" },
            },
          },
        ],
      },
    ],
  },
  {
    id: "volkswagen",
    name: "Volkswagen",
    nameFA: "فولکس‌واگن",
    logo: "https://www.carlogos.org/car-logos/volkswagen-logo-2019-640.png",
    models: [
      {
        id: "golf",
        name: "Golf",
        years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
        engines: [
          {
            id: "golf-1.4t",
            name: "1.4L TSI",
            displacement: "1.4L",
            fuelType: "gasoline",
            recommendedOil: {
              viscosity: "5W-40",
              type: "Full Synthetic",
              capacity: "4.3L",
              specification: "VW 502.00, API SN",
              productId: "apex-pro-racing",
            },
            recommendedFilters: {
              oilFilter: { partNumber: "APX-OF-1013", productId: "filter-oil-1013" },
              airFilter: { partNumber: "APX-AF-2013", productId: "filter-air-2013" },
              cabinFilter: { partNumber: "APX-CF-3010", productId: "filter-cabin-3010" },
            },
          },
          {
            id: "golf-gti",
            name: "GTI 2.0L TSI",
            displacement: "2.0L",
            fuelType: "gasoline",
            recommendedOil: {
              viscosity: "5W-40",
              type: "Full Synthetic",
              capacity: "5.7L",
              specification: "VW 502.00, API SN",
              productId: "apex-pro-racing",
            },
            recommendedFilters: {
              oilFilter: { partNumber: "APX-OF-1014", productId: "filter-oil-1014" },
              airFilter: { partNumber: "APX-AF-2014", productId: "filter-air-2014" },
              cabinFilter: { partNumber: "APX-CF-3010", productId: "filter-cabin-3010" },
            },
          },
        ],
      },
      {
        id: "passat",
        name: "Passat",
        years: [2016, 2017, 2018, 2019, 2020, 2021, 2022],
        engines: [
          {
            id: "passat-1.8t",
            name: "1.8L TSI",
            displacement: "1.8L",
            fuelType: "gasoline",
            recommendedOil: {
              viscosity: "5W-40",
              type: "Full Synthetic",
              capacity: "4.9L",
              specification: "VW 502.00, API SN",
              productId: "apex-pro-racing",
            },
            recommendedFilters: {
              oilFilter: { partNumber: "APX-OF-1015", productId: "filter-oil-1015" },
              airFilter: { partNumber: "APX-AF-2015", productId: "filter-air-2015" },
              cabinFilter: { partNumber: "APX-CF-3011", productId: "filter-cabin-3011" },
            },
          },
        ],
      },
    ],
  },
  {
    id: "hyundai",
    name: "Hyundai",
    nameFA: "هیوندای",
    logo: "https://www.carlogos.org/car-logos/hyundai-logo-2011-640.png",
    models: [
      {
        id: "sonata",
        name: "Sonata",
        years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
        engines: [
          {
            id: "sonata-2.5",
            name: "2.5L 4-Cylinder",
            displacement: "2.5L",
            fuelType: "gasoline",
            recommendedOil: {
              viscosity: "5W-30",
              type: "Full Synthetic",
              capacity: "5.1L",
              specification: "API SN Plus, ILSAC GF-5",
              productId: "apex-elite-gt",
            },
            recommendedFilters: {
              oilFilter: { partNumber: "APX-OF-1016", productId: "filter-oil-1016" },
              airFilter: { partNumber: "APX-AF-2016", productId: "filter-air-2016" },
              cabinFilter: { partNumber: "APX-CF-3012", productId: "filter-cabin-3012" },
            },
          },
        ],
      },
      {
        id: "tucson",
        name: "Tucson",
        years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
        engines: [
          {
            id: "tucson-2.5",
            name: "2.5L 4-Cylinder",
            displacement: "2.5L",
            fuelType: "gasoline",
            recommendedOil: {
              viscosity: "5W-30",
              type: "Full Synthetic",
              capacity: "5.1L",
              specification: "API SN Plus, ILSAC GF-5",
              productId: "apex-elite-gt",
            },
            recommendedFilters: {
              oilFilter: { partNumber: "APX-OF-1017", productId: "filter-oil-1017" },
              airFilter: { partNumber: "APX-AF-2017", productId: "filter-air-2017" },
              cabinFilter: { partNumber: "APX-CF-3013", productId: "filter-cabin-3013" },
            },
          },
        ],
      },
    ],
  },
  {
    id: "kia",
    name: "Kia",
    nameFA: "کیا",
    models: [
      {
        id: "optima",
        name: "Optima / K5",
        years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
        engines: [
          {
            id: "optima-2.5",
            name: "2.5L 4-Cylinder",
            displacement: "2.5L",
            fuelType: "gasoline",
            recommendedOil: {
              viscosity: "5W-30",
              type: "Full Synthetic",
              capacity: "5.1L",
              specification: "API SN Plus, ILSAC GF-5",
              productId: "apex-elite-gt",
            },
            recommendedFilters: {
              oilFilter: { partNumber: "APX-OF-1018", productId: "filter-oil-1018" },
              airFilter: { partNumber: "APX-AF-2018", productId: "filter-air-2018" },
              cabinFilter: { partNumber: "APX-CF-3014", productId: "filter-cabin-3014" },
            },
          },
        ],
      },
      {
        id: "sportage",
        name: "Sportage",
        years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
        engines: [
          {
            id: "sportage-2.5",
            name: "2.5L 4-Cylinder",
            displacement: "2.5L",
            fuelType: "gasoline",
            recommendedOil: {
              viscosity: "5W-30",
              type: "Full Synthetic",
              capacity: "5.1L",
              specification: "API SN Plus, ILSAC GF-5",
              productId: "apex-elite-gt",
            },
            recommendedFilters: {
              oilFilter: { partNumber: "APX-OF-1019", productId: "filter-oil-1019" },
              airFilter: { partNumber: "APX-AF-2019", productId: "filter-air-2019" },
              cabinFilter: { partNumber: "APX-CF-3015", productId: "filter-cabin-3015" },
            },
          },
        ],
      },
    ],
  },
  {
    id: "ford",
    name: "Ford",
    nameFA: "فورد",
    models: [
      {
        id: "mustang",
        name: "Mustang",
        years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
        engines: [
          {
            id: "mustang-2.3t",
            name: "2.3L EcoBoost",
            displacement: "2.3L",
            fuelType: "gasoline",
            recommendedOil: {
              viscosity: "5W-30",
              type: "Full Synthetic",
              capacity: "5.7L",
              specification: "API SN Plus, Ford WSS-M2C946-B1",
              productId: "apex-pro-racing",
            },
            recommendedFilters: {
              oilFilter: { partNumber: "APX-OF-1020", productId: "filter-oil-1020" },
              airFilter: { partNumber: "APX-AF-2020", productId: "filter-air-2020" },
              cabinFilter: { partNumber: "APX-CF-3016", productId: "filter-cabin-3016" },
            },
          },
          {
            id: "mustang-5.0",
            name: "5.0L V8",
            displacement: "5.0L",
            fuelType: "gasoline",
            recommendedOil: {
              viscosity: "5W-50",
              type: "Racing Formula",
              capacity: "9.5L",
              specification: "API SN Plus",
              productId: "apex-extreme",
            },
            recommendedFilters: {
              oilFilter: { partNumber: "APX-OF-1021", productId: "filter-oil-1021" },
              airFilter: { partNumber: "APX-AF-2021", productId: "filter-air-2021" },
              cabinFilter: { partNumber: "APX-CF-3016", productId: "filter-cabin-3016" },
            },
          },
        ],
      },
      {
        id: "f150",
        name: "F-150",
        years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
        engines: [
          {
            id: "f150-3.5t",
            name: "3.5L EcoBoost V6",
            displacement: "3.5L",
            fuelType: "gasoline",
            recommendedOil: {
              viscosity: "5W-30",
              type: "Full Synthetic",
              capacity: "5.7L",
              specification: "API SN Plus",
              productId: "apex-pro-racing",
            },
            recommendedFilters: {
              oilFilter: { partNumber: "APX-OF-1022", productId: "filter-oil-1022" },
              airFilter: { partNumber: "APX-AF-2022", productId: "filter-air-2022" },
              cabinFilter: { partNumber: "APX-CF-3017", productId: "filter-cabin-3017" },
            },
          },
        ],
      },
    ],
  },
  {
    id: "chevrolet",
    name: "Chevrolet",
    nameFA: "شورولت",
    models: [
      {
        id: "camaro",
        name: "Camaro",
        years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
        engines: [
          {
            id: "camaro-2.0t",
            name: "2.0L Turbo",
            displacement: "2.0L",
            fuelType: "gasoline",
            recommendedOil: {
              viscosity: "5W-30",
              type: "Full Synthetic",
              capacity: "4.7L",
              specification: "API SN Plus, dexos1 Gen 2",
              productId: "apex-pro-racing",
            },
            recommendedFilters: {
              oilFilter: { partNumber: "APX-OF-1023", productId: "filter-oil-1023" },
              airFilter: { partNumber: "APX-AF-2023", productId: "filter-air-2023" },
              cabinFilter: { partNumber: "APX-CF-3018", productId: "filter-cabin-3018" },
            },
          },
          {
            id: "camaro-6.2",
            name: "6.2L V8",
            displacement: "6.2L",
            fuelType: "gasoline",
            recommendedOil: {
              viscosity: "5W-50",
              type: "Racing Formula",
              capacity: "7.6L",
              specification: "API SN Plus, dexos1 Gen 2",
              productId: "apex-extreme",
            },
            recommendedFilters: {
              oilFilter: { partNumber: "APX-OF-1024", productId: "filter-oil-1024" },
              airFilter: { partNumber: "APX-AF-2024", productId: "filter-air-2024" },
              cabinFilter: { partNumber: "APX-CF-3018", productId: "filter-cabin-3018" },
            },
          },
        ],
      },
    ],
  },
  {
    id: "nissan",
    name: "Nissan",
    nameFA: "نیسان",
    models: [
      {
        id: "altima",
        name: "Altima",
        years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
        engines: [
          {
            id: "altima-2.5",
            name: "2.5L 4-Cylinder",
            displacement: "2.5L",
            fuelType: "gasoline",
            recommendedOil: {
              viscosity: "0W-20",
              type: "Full Synthetic",
              capacity: "4.9L",
              specification: "API SN Plus",
              productId: "apex-elite-gt",
            },
            recommendedFilters: {
              oilFilter: { partNumber: "APX-OF-1025", productId: "filter-oil-1025" },
              airFilter: { partNumber: "APX-AF-2025", productId: "filter-air-2025" },
              cabinFilter: { partNumber: "APX-CF-3019", productId: "filter-cabin-3019" },
            },
          },
        ],
      },
    ],
  },
]
