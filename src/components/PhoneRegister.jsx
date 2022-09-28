import { useState } from "react";
import AddButton from "./AddButton";

export default function PhoneRegister() {

    const [ddd, setDdd] = useState("");
    const [ddi, setDdi] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [contactId, setContactId] = useState("");
    const [message, setMessage] = useState("");

    const formStyle = {
        display: 'flex',
        flexDirection: 'column'
    }

    let handleSubmit = async (e) => {

        e.preventDefault();

        try {
            let result = await fetch('http://localhost:8080/api/contacts/' + contactId + '/phones', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        ddd: ddd,
                        ddi: ddi,
                        phoneNumber: phoneNumber
                    }
                )
            })

            if (result.status === 200 || result.status === 201) {
                setDdd("");
                setDdi("");
                setPhoneNumber("");
                setContactId("");
                setMessage("Telefone criado com sucesso")
            } else {
                setMessage("Falha ao executar operação");
            }

        } catch (error) {
            setMessage(error.message)
        }

    }
    return (
        <div>

            <h3>Registro de telefone</h3>
            
            <form onSubmit={handleSubmit} style={formStyle}>
                <input
                    type="number"
                    value={ddd}
                    placeholder={"DDD"}
                    onChange={(e) => setDdd(e.target.value)}
                />

                <input
                    type="number"
                    value={ddi}
                    placeholder={"DDI"}
                    onChange={(e) => setDdi(e.target.value)}
                />

                <input
                    type="number"
                    value={phoneNumber}
                    placeholder={"Telefone"}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />

                <input
                    type="number"
                    value={contactId}
                    placeholder={"Id do contato"}
                    onChange={(e) => setContactId(e.target.value)}
                />

                <AddButton>Cadastrar telefone</AddButton>

                <div className="message">{message ? <p>{message}</p> : null}</div>
            </form>

        </div>
    )
}