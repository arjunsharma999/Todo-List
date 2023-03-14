import React, {
    useState, useEffect
} from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const intialState = {
    name: "",
    email: "",
    contact: "",
};


const AddEdit = () => {
    const [state, setstate] = useState(intialState);

    const { name, email, contact } = state;

    const Navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
  axios.get('http://localhost:5000/api/get/${id}').then ((resp) => setstate({...resp.data[0]}) );
    }), [id]

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !contact) {
            toast.error("please provide value into each input field");
        } else {
            axios.post("http://localhost:5000/api/post", {
                name,
                email,
                contact,
            })
                .then(() => {
                    setstate({ name: "", email: "", contact: "" });
                })
                .catch((err) => toast.error(err.resposne.data));
            toast.success("Added Succesfully");
            setTimeout(() => Navigate("/"), 100);
        }
    };

    const handleInputchange = (e) => {
        const { name, value } = e.target;
        setstate({ ...state, [name]: value });
    };

    return (
        <div style={{ marginTop: "100px" }}>
            <form
                style={{
                    margin: "auto",
                    padding: "15px",
                    maxwidth: "200px",
                    alignContent: "center",
                }}

                onSubmit={handleSubmit}
            >
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="your name..."
                    value={name || ""}
                    onChange={handleInputchange}
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your Email..."
                    value={email || ""}
                    onChange={handleInputchange}
                />

                <label htmlFor="contact">Contact</label>
                <input
                    type="number"
                    id="contact"
                    name="contact"
                    placeholder="your contact No..."
                    value={contact || ""}
                    onChange={handleInputchange}
                />

                <input type="submit" value="SAVE" />
                <Link to="/">
                    <input type="button" value="GO BACK" />
                </Link>


            </form>

        </div>


    );
};



export default AddEdit;