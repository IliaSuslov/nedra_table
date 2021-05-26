import { createStoreon } from 'storeon'
import { storeonDevtools } from 'storeon/devtools';

const table = {
    headers: [
        { head: 'Бренд', name: 'brand' },
        { head: 'Модель', name: 'model' },
        { head: 'Год', name: 'year' },
        { head: "Топливо", name: 'fuel' },
        { head: "Форма кузова", name: 'bodyType' },
        { head: "Цена", name: 'price' },
    ],
    data: [
        { brand: 'BMW', model: 'M3', year: 2010, fuel: 'petrol', bodyType: 'cabrio', price: 5999 },
        { brand: 'BMW', model: 'X5', year: 2015, fuel: 'diesel', bodyType: 'crossover', price: 15000 },
        { brand: 'Mercedes', model: 'E63', year: 2016, fuel: 'petrol', bodyType: 'sedan', price: 10000 },
        { brand: 'Tesla', model: "Model S", year: 2020, fuel: 'electric', bodyType: 'sedan', price: 16000 },
        { brand: 'Audi', model: 'RS5', year: 2019, fuel: 'petrol', bodyType: 'hatchback', price: 20000 },
        { brand: 'Dodge', model: 'Viper', year: 1997, fuel: 'petrol', bodyType: 'sedan', price: 17999 },
    ],
    page: 1,
    limit: 5,
    sort_field: "brand",
    sort_direction: "asc",
    filter: {
        brand: '',
        model: '',
        year: '',
        fuel: '',
        bodyType: '',
        price: '',
    }
}


let app = store => {
    store.on('@init', () => ({ table }));

    store.on('table/changed', ({ table }, payload) => {
        return { table: { ...table, ...payload } }
    })

    store.on('filter/changed', ({ table }, payload) => {
        return { table: { ...table, filter: { ...table.filter, ...payload } } }
    })

    store.on('sort/changed', ({ table }, header) => {
        switch (header) {
            case 'brand':
                let sBrand = () => {
                    if (table.sort_direction === 'asc') {
                        return table.data.sort((a, b) => a.brand.toLowerCase() < b.brand.toLowerCase() ? -1 : 0);
                    } else {
                        return table.data.sort((a, b) => a.brand.toLowerCase() > b.brand.toLowerCase() ? -1 : 0);
                    }
                }
                sBrand();
                break;
            case 'model':
                let sModel = () => {
                    if (table.sort_direction === 'asc') {
                        return table.data.sort((a, b) => a.model.toLowerCase() < b.model.toLowerCase() ? -1 : 0);
                    } else {
                        return table.data.sort((a, b) => a.model.toLowerCase() > b.model.toLowerCase() ? -1 : 0);
                    }
                }
                sModel();
                break;
            case 'year':
                let sYear = () => {
                    if (table.sort_direction === 'asc') {
                        return table.data.sort((f, s) => f.year - s.year);
                    } else {
                        return table.data.sort((f, s) => s.year - f.year);
                    }
                }
                sYear();
                break;
            case 'fuel':
                let sFuel = () => {
                    if (table.sort_direction === 'asc') {
                        return table.data.sort((a, b) => a.fuel.toLowerCase() < b.fuel.toLowerCase() ? -1 : 0);
                    } else {
                        return table.data.sort((a, b) => a.fuel.toLowerCase() > b.fuel.toLowerCase() ? -1 : 0);
                    }
                }
                sFuel();
                break;
            case 'bodyType':
                let sBodyType = () => {
                    if (table.sort_direction === 'asc') {
                        return table.data.sort((a, b) => a.bodyType.toLowerCase() < b.bodyType.toLowerCase() ? -1 : 0);
                    } else {
                        return table.data.sort((a, b) => a.bodyType.toLowerCase() > b.bodyType.toLowerCase() ? -1 : 0);
                    }
                }
                sBodyType();
                break;
            case 'price':
                let sPrice = () => {
                    if (table.sort_direction === 'asc') {
                        return table.data.sort((f, s) => f.price - s.price);
                    } else {
                        return table.data.sort((f, s) => s.price - f.price);
                    }
                }
                sPrice();
                break;
            default:
                break;
        }
    });

    store.on('filter', ({ table }) => {
        const { brand, model, year, fuel, bodyType, price } = table.filter;
        const sortedData = table.data
            .filter(d => brand === "" ? true : d.brand.toLowerCase().includes(brand))
            .filter(d => model === "" ? true : d.model.toLowerCase().includes(model))
            .filter(d => year === "" ? true : String(d.year).includes(year))
            .filter(d => fuel === "" ? true : d.fuel.toLowerCase().includes(fuel))
            .filter(d => bodyType === "" ? true : d.bodyType.toLowerCase().includes(bodyType))
            .filter(d => price === "" ? true : String(d.price).includes(price))
        return { table: { ...table, sortedData } }
    });
    store.on('sort/dir', ({ table }) => {
        const dir = () => {
            if (table.sort_direction === "asc") { return "desc" }
            else { return "asc" }
        }
        let res = dir();
        return { table: { ...table, sort_direction: res } }
    });
}

export const store = createStoreon(
    [
        app,
        process.env.NODE_ENV !== 'production' && storeonDevtools
    ])
