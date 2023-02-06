import OrderServiceUpdateForm  from "./index";
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Providers from '../../utils/test-utils'
import { AuthContext } from '../../contexts/auth'
import { mockComponent } from "react-dom/test-utils";

test('should validate the form', () => {
    const OrderServiceUpdateForm = jest.fn();
    expect(OrderServiceUpdateForm).toHaveFormValues;
   
})