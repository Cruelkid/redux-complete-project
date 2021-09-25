import { cartActions } from './cart-slice';
import { uiActions } from './ui-slice';

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                'https://react-http-59bac-default-rtdb.europe-west1.firebasedatabase.app/redux/cart.json'
            );

            if (!response.ok) {
                throw new Error('Fetching cart data failed!');
            }

            const data = await response.json();

            return data;
        };

        try {
            const cartData = await fetchData();

            dispatch(cartActions.replaceCart(cartData));
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: error.message + ' :(',
                })
            );
        }
    };
};

export const sendCartData = (cartData) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: 'pending',
                title: 'Pending...',
                message: 'Sending cart data...',
            })
        );

        const sendRequest = async () => {
            const response = await fetch(
                'https://react-http-59bac-default-rtdb.europe-west1.firebasedatabase.app/redux/cart.json',
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        items: cartData.items,
                        totalQuantity: cartData.totalQuantity
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Sending cart data failed!');
            }
        };

        try {
            await sendRequest();

            dispatch(
                uiActions.showNotification({
                    status: 'success',
                    title: 'Success!',
                    message: 'Cart data sent successfully!',
                })
            );
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: error.message + ' :(',
                })
            );
        }
    };
};
