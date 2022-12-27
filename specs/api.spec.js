import axios from "axios";
import {expect, test} from "@jest/globals";


test('search for the couriers Id Login in the system', async () => {
    const config = {
        method: 'post',
        url: 'https://qa-scooter.praktikum-services.ru/api/v1/courier/login',
        data: {
            "login": "dnin55ja",
            "password": "5555"
          },
    }
        const resp = await axios(config);
        console.log(resp.data);
        expect(resp.status).toEqual(200);

});

test('Incorrect password when searching for the courier id', async () => {
    const config = {
        method: 'post',
        url: 'https://qa-scooter.praktikum-services.ru/api/v1/courier/login',
        data: {
            "login": "dnin55ja",
            "password": "55554"
          },
    }

    try {
        const resp = await axios(config);
    }
    catch (e) {
        console.log(e);
        expect(e.response.status).toEqual(404);
        expect(e.response.data.message).toEqual('Учетная запись не найдена')
    }
});

test('Creating a duplicate of the couriers login', async () => {
    const config = {
        method: 'post',
        url: 'https://qa-scooter.praktikum-services.ru/api/v1/courier',
        data: {
            "login": "dnin55ja",
            "password": "5555",
            "firstName": "saske"
          },
    }
    try {
        const resp = await axios(config);
    }
    catch (e) {
        console.log(e);
        expect(e.response.status).toEqual(409);
        expect(e.response.data.message).toEqual('Этот логин уже используется')
    }

});

test('Creating orders', async () => {
    const config = {
        method: 'post',
        url: 'https://qa-scooter.praktikum-services.ru/api/v1/orders',
        data: {
            "firstName": "Dima",
            "lastName": "DimaE",
            "address": "Konwoha, 142 apt.",
            "metroStation": 4,
            "phone": "+7 900 355 35 35",
            "rentTime": 5,
            "deliveryDate": "2020-06-06",
            "comment": "Saske, comwe back to Konoha",
            "color": [
                "BLACK"
            ]
          },
    }
        const resp = await axios(config);
        console.log(resp);
        expect(resp.status).toEqual(201);
        expect(resp.data.track).toBeTruthy() 
});

test.only('Get the number of courier orders "Courier not found":', async () => {
    const config = {
        method: 'get',
        url: 'https://qa-scooter.praktikum-services.ru//api/v1/courier/555/ordersCount',
    }

    try {
        const resp = await axios(config);
    }
    catch (e) {
        console.log(e);
        expect(e.response.status).toEqual(404);
        expect(e.response.data.code).toEqual(404);
        expect(e.response.data.message).toEqual('Courier not found')
    }
});

