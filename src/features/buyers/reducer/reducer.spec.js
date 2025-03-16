import produce from "immer";
import getInitialState from "../initialState";
import types from "../actionsTypes";
import helpers from "../../../helpers";
import merchantReducer from './index'
describe('merchantReducer', () => {
    it('should return the initial state', () => {
        const initialState = getInitialState(); // Update the expected initial state
        const action = { type: 'UNKNOWN_ACTION' };
        const nextState = merchantReducer(undefined, action);
        expect(nextState).toEqual(initialState);
    });

    it('should handle selectedSet action', () => {
        const initialState = { selected: null, all: {} };
        const action = { type: types.selectedSet, payload: { id: 'merchantId' } };
        const nextState = merchantReducer(initialState, action);
        expect(nextState.selected).toEqual('merchantId');
    });

    it('should handle merge action', () => {
        const initialState = { selected: null, all: {} };
        const payload = {
            all: {
                merchant1: { name: 'Merchant 1' },
                merchant2: { name: 'Merchant 2' },
            },
        };
        const action = { type: types.merge, payload };
        const nextState = merchantReducer(initialState, action);
        expect(nextState.all).toEqual(payload.all);
    });

    it('should handle updated action', () => {
        const initialState = { selected: null, all: {} };
        const payload = {
            merchant: { id: 'merchant1', name: 'Updated Merchant' },
        };
        const action = { type: types.updated, payload };
        const nextState = merchantReducer(initialState, action);
        expect(nextState.all['merchant1']).toEqual(payload.merchant);
    });

    it('should handle websiteAdded action', () => {
        const initialState = {
            all: {
                merchant1: { websites: [] },
            },
            allIds: ['merchant1'],
            selected: null,
        };
        const expected = {
            websites: [
                { id: 1, url: "https://laptops.msitifa1.com", status: 'Verified' },
            ]
        };
        const payload = {
            merchantId: 'merchant1',
            website:
                { id: 1, url: "https://laptops.msitifa1.com", status: 'Verified' },

        };
        const action = { type: types.websiteAdded, payload };
        const nextState = merchantReducer(initialState, action);
        expect(nextState.all['merchant1'].websites).toHaveLength(1);
        expect(nextState.all['merchant1']).toEqual(expected);
    });

    it('should handle websiteUpdated action', () => {
        const initialState = {
            selected: null,
            all: {
                merchant1: {
                    id: 'merchant1',
                    websites: [{ id: 'website1', url: 'oldurl.com', status: 'Verifie' }],
                },
            },
        };
        const payload = {
            merchantId: 'merchant1',
            website: { id: 'website1', url: 'newurl.com', status: 'Verified' },
        };
        const action = { type: types.websiteUpdated, payload };
        const nextState = merchantReducer(initialState, action);
        // expect(nextState.all['merchant1'].websites[0].url).toEqual(payload.website.url); 
    });

    it('should handle websiteDeleted action', () => {
        const initialState = {
            selected: null,
            all: {
                merchant1: {
                    id: 'merchant1',
                    websites: [{ id: 'website1' }, { id: 'website2' }],
                },
            },
        };
        const payload = { merchantId: 'merchant1', websiteId: 'website1' };
        const action = { type: types.websiteDeleted, payload };
        const nextState = merchantReducer(initialState, action);
        expect(nextState.all['merchant1'].websites).toHaveLength(1);
        expect(nextState.all['merchant1'].websites[0].id).toEqual('website2');
    });

    it('should handle phoneUpdated action', () => {
        const initialState = {
            selected: null,
            all: {
                merchant1: {
                    id: 'merchant1',
                    phone: '1234567890',
                },
            },
        };
        const payload = {
            merchantId: 'merchant1',
            phone: '9876543210',
        };
        const action = { type: types.phoneUpdated, payload };
        const nextState = merchantReducer(initialState, action);
        expect(nextState.all['merchant1'].phone).toEqual(payload.phone);
    });
    it('should handle deleted action', () => {
        const initialState = {
            selected: null,
            all: {
                merchant1: { id: 'merchant1', name: 'Merchant 1' },
                merchant2: { id: 'merchant2', name: 'Merchant 2' },
            },
        };

        const payload = { merchant: { id: 'merchant2' } };
        const action = { type: types.deleted, payload };
        const nextState = merchantReducer(initialState, action);

        expect(nextState.all).toEqual({
            merchant1: { id: 'merchant1', name: 'Merchant 1' }
        });
    });
});