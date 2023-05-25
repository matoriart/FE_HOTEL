import React from 'react'
import Sidebar from '../Components/Sidebar'
import Header from '../Components/Header';
import axios from 'axios'

export default class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            user: [],
            customer: [],
            tipe_kamar: [],
            kamar: [],
            role: "",
            token: "",
            action: ""

        }

        if (localStorage.getItem("token")) {
            if (localStorage.getItem("role") === "admin" ||
                localStorage.getItem("role") === "resepsionis") {
                this.state.token = localStorage.getItem("token")
                this.state.role = localStorage.getItem("role")
            } else {
                window.alert("You're not admin or resepsionis!")
                window.location = "/"
            }
        }
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header;
    }

    getUser = () => {
        let url = "http://localhost:8080/user";
        axios
            .get(url, this.headerConfig())
            .then((response) => {
                this.setState({
                    user: response.data.count,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    getCustomer = () => {
        let url = "http://localhost:8080/customer/"
        axios.get(url)
            .then((response) => {
                this.setState({
                    customer: response.data.count
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getkamar = () => {
        let url = "http://localhost:8080/kamar"
        axios.get(url)
            .then(response => {
                this.setState({
                    kamar: response.data.count
                })
                console.log(response.data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    gettipe_kamar = () => {
        let url = "http://localhost:8080/kamar-type"
        axios.get(url)
            .then(response => {
                this.setState({
                    tipe_kamar: response.data.count
                })
                console.log(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    checkRole = () => {
        if (this.state.role !== "admin" && this.state.role !== "resepsionis") {
            localStorage.clear()
            window.alert("You're not admin or resepsionis!")
            window.location = '/'
        }
    }

    componentDidMount() {
        this.getUser();
        this.getCustomer();
        this.getkamar()
        this.gettipe_kamar()
        this.checkRole()
    }

    render() {
        return (
            <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
                <Sidebar />
                <main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
                    <Header />
                    <div class="main-content flex flex-col flex-grow p-4">
                        <div class="flex flex-row h-40">
                            <div class="w-1/2 text-gray-700 text-center bg-rose-300 px-4 py-2 m-2 rounded-md border-2  border-rose-400 ">
                                <p class="mt-8 text-xl font-medium">Jumlah User</p>
                                <p class="text-lg font-bold">{this.state.user}</p>
                            </div>
                            <div class="w-1/2 text-gray-700 text-center bg-fuchsia-300 px-4 py-2 m-2 rounded-md border-2  border-fuchsia-400 ">
                                <p class="mt-8 text-xl font-medium">Jumlah Customer</p>
                                <p class="text-lg font-bold">{this.state.customer}</p>
                            </div>
                        </div>
                        <div class="flex flex-row h-40">
                            <div class="w-1/2 text-gray-700 text-center bg-sky-300 px-4 py-2 m-2 rounded-md border-2  border-sky-400 ">
                                <p class="mt-8 text-xl font-medium">Jumlah kamar</p>
                                <p class="text-lg font-bold">{this.state.kamar}</p>
                            </div>
                            <div class="w-1/2 text-gray-700 text-center bg-cyan-300 px-4 py-2 m-2 rounded-md border-2  border-cyan-400 ">
                                <p class="mt-8 text-xl font-medium">Jumlah Type kamar</p>
                                <p class="text-lg font-bold">{this.state.tipe_kamar}</p>
                            </div>
                        </div>
                    </div>
                    <footer class="footer px-4 py-2">
                        <div class="footer-content">
                            <p class="text-sm text-gray-600 text-center">© NextHotel 2023. All rights reserved. <a href="https://twitter.com/iaminos">by Matori</a></p>
                        </div>
                    </footer>
                </main>
            </div>
        );
    }
}