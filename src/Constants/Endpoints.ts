export default class Endpoints {
    static BASE_URL = 'http://localhost:8080';

    // 1. returns all the shifts present. GET
    static GET_SHIFTS = `${Endpoints.BASE_URL}/shifts`;

    // 2. returns single shift by id. GET
    // usages:- Endpoints.GET_SINGLE_SHIFT.replace('{id}', (id of the item)),
    static GET_SINGLE_SHIFT = `${Endpoints.GET_SHIFTS}/{id}`;

    // 3. books single shift by id. POST
    static BOOK_SINGLE_SHIFT = `${Endpoints.GET_SINGLE_SHIFT}/book`;

    // 4. cancels single shift by id. POST
    static CANCEL_SINGLE_SHIFT = `${Endpoints.GET_SINGLE_SHIFT}/cancel`

}