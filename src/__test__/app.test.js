import React from 'react';
import { shallow } from 'enzyme';
import { create } from 'react-test-renderer';
import Header from '../app/components/header';
import Login from '../app/views/login';
import Register from '../app/views/register';
import Recover from '../app/components/recoverPass';
import ChooseOption from '../app/views/chooseOption';
import Diseases from '../app/views/diseases';
import Accounting from '../app/views/accounting';

describe('Componentes Snapshot', () => {
    test('Comprobar componente funcional del header',() => {
        const header = create(<Header />)
        expect(header.toJSON()).toMatchSnapshot();
    })

    test('Comprobar componente funcional del login',() => {
        const login = shallow(<Login />)
        expect(login.find(".login-container").length).toBe(0);
    })

    test('Comprobar componente funcional del registro',() => {
        const register = shallow(<Register />)
        expect(register.find(".login-container-register").length).toBe(1);
    })

    test('Comprobar componente funcional del recuperacion',() => {
        const recover = shallow(<Recover />)
        expect(recover.find(".recover-container").length).toBe(1);
    })

    test('Comprobar componente funcional del menu principal',() => {
        const chooseOption = shallow(<ChooseOption />)
        expect(chooseOption.find(".choose-container").length).toBe(1);
    })

    test('Comprobar componente funcional de enfermedades',() => {
        const diseases = shallow(<Diseases />)
        expect(diseases.find(".diseases-container").length).toBe(0);
    })

    test('Comprobar componente funcional del menu de contabilidad',() => {
        const accounting = shallow(<Accounting />)
        expect(accounting.find(".accounting-container").length).toBe(1);
    })
})