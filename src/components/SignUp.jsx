import { useState } from "react";
import styles from "../styles/styles.module.css"
import AddButton from "./AddButton";

export default function SignIn(){

    const [username, SetUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    

    const formStyle = {
        display: 'flex',
        flexDirection: 'column'
    }


    let handleSubmit = async(e) => {
        e.preventDefault();
        

        try {
            
            let res = await fetch("http://localhost:8080/api/users",{
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body : JSON.stringify({
                    username: username,
                    email: email,
                    password: password
                }),
            });

            //mainipulando o resultado da request
            let jsonRes = await res.json();

            if (res.status === 200) {
                setEmail("");
                SetUsername("");
                setPassword("");
                setMessage("Usuário criado com sucesso");
                console.log(jsonRes);
            } else {
                console.log(res);
                setMessage("Falha ao executar operação");
            }

        } catch (error) {
            setMessage("Falha ao executar operação");
            console.log(error);
        }
    };

    return(

        <div>

            <h3>Cadastro</h3>

            <form onSubmit={handleSubmit} style={formStyle}>

                <input 
                    type="text"
                    value={username}
                    placeholder={"Nome"}
                    className={styles.input}
                    onChange={(e) => SetUsername(e.target.value)}   
                />

                <input 
                    type="email" 
                    value={email}
                    placeholder={"Email"}
                    className={styles.input}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input 
                    type="password" 
                    value={password}
                    placeholder={"Senha"}
                    className={styles.input}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <AddButton>SignUp</AddButton>

                <div className="message">{message ? <p>{message}</p> : null}</div>

            </form>

        </div>

    );

}