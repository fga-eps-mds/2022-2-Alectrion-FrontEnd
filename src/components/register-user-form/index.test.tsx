import RegisterUserForm from "./index"
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Providers from '../../utils/test-utils'
import { AuthContext } from '../../contexts/auth'
import { mockComponent } from "react-dom/test-utils";

test('validates the creation of user data', () => {
    //mocka os dados necessários
    const RegisterUserForm = jest.fn();
    expect(RegisterUserForm).toBeValid;


})