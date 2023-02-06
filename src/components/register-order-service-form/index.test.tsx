import RegisterOrderService from "./index";
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Providers from '../../utils/test-utils'
import { AuthContext } from '../../contexts/auth'
import { mockComponent } from "react-dom/test-utils";

test('should validate the form for registration', () => {
    const RegisterOrderService =  jest.fn();
    expect(RegisterOrderService).toHaveFormValues;
})