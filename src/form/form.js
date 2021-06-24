import React, {useEffect, useState} from "react";

import "./formStyle.css"

import CustomInput from "../customInput/customInput";
import ErrorMessage from "../utils/ErrorMessage";


const Form = () => {
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [patronymic, setPatronymic] = useState("")
    const [date, setDate] = useState("")
    const [birth, setBirth] = useState("")
    const [numberPassport, setNumberPassport] = useState("")

    const [error, setError] = useState(false)


    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }


    const handleNameInput = (event) => {
        setName(event.target.value)
    }
    const handleSurnameInput = (event) => {
        setSurname(event.target.value)
    }
    const handlePatronymicInput = (event) => {
        setPatronymic(event.target.value)
    }
    const handleDateInput = (event) => {
        setDate(event.target.value)
    }
    const handleBirthInput = (event) => {
        setBirth(event.target.value)
    }
    const handleNumberPassportInput = (event) => {
        setNumberPassport(event.target.value)
    }

    //заполнение полей из cookies
    useEffect(() => {
        const test = getCookie("users")
        if (test === undefined) {
        } else {
            const user = JSON.parse(test)

            setName(user.name)
            setSurname(user.surname)
            setPatronymic(user.patronymic)
            setDate(user.date)
            setBirth(user.PlaceOfBirth)
            setNumberPassport(user.NumberPassport)
        }

    }, [])


    const handleSubmitForm = (event) => {
        event.preventDefault()

        setError(false)

        const infoUser = {
            name: name,
            surname: surname,
            patronymic: patronymic,
            date: date,
            PlaceOfBirth: birth,
            NumberPassport: numberPassport
        }
        if (name && surname && date && birth && numberPassport) {

            document.cookie = "users" + "=" + JSON.stringify(infoUser)

            setName("")
            setSurname("")
            setPatronymic("")
            setDate("")
            setBirth("")
            setNumberPassport("")

        } else {
            setError(true)
        }
    }


    return (
        <div className="bg">
            <form className="form" onSubmit={handleSubmitForm}>
                <div className="flexInputs">
                    <div className="wrapperInputs">
                        <CustomInput onChange={handleNameInput} name="inputName" type="text" placeholder="Имя"
                                     value={name} style={error === true ? {border: "3px solid red"} : {}}/>
                        <CustomInput onChange={handleSurnameInput} type="text" placeholder="Фамилия" value={surname}
                                     style={error === true ? {border: "3px solid red"} : {}}/>
                        <CustomInput onChange={handlePatronymicInput} type="text" placeholder="Отчество"
                                     value={patronymic}/>
                        <CustomInput onChange={handleDateInput} type="date" placeholder="Дата" value={date}
                                     style={error === true ? {border: "3px solid red"} : {}}/>
                        <CustomInput onChange={handleBirthInput} type="text" placeholder="Место рождения" value={birth}
                                     style={error === true ? {border: "3px solid red"} : {}}/>
                        <CustomInput onChange={handleNumberPassportInput} type="number"
                                     placeholder="Номер серия паспорта" value={numberPassport}
                                     style={error === true ? {border: "3px solid red"} : {}}/>
                        {error && <ErrorMessage errorText="Заполните все обязательные поля"/>}
                        <button className="formBtn">Зарегистрироваться</button>
                    </div>
                </div>
            </form>
        </div>

    )

}
export default Form;