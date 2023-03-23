import { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import services from "../../Services/services";
import './Dashboard.css';
const Dashboard = () => {
    const [user,setUser] = useState(null)
    const navigate = useNavigate();
    useEffect(()=> {
        const getUser = () => {
            const id = sessionStorage.getItem('id')
            const token = sessionStorage.getItem('token')
            console.log('token',token)
            services({url: `http://localhost:5000/get/${id}`,method:'get',token: token}).then(res => {
                setUser({...res?.data?.data})
            }).catch(err => {
                console.log("error",err?.response?.data)
                // navigate('/')
            })
        }
        getUser()
    },[])
    return (
        <div style={{margin: '10px'}}>
            <Container d-flex align-items-center justify-content-center dashboard-container>
                <Row>
                    <Col>
                        <h1>Welcome Dashboard</h1>
                        {user && <>
                        <h4>{user.name}</h4>
                        <h4>{user.email}</h4>
                        </>}
                    </Col>
                    <Col>
                        <Button onClick={() => {
                            sessionStorage.clear();
                            navigate('/')
                        }}>Logout</Button>
                    </Col>
                </Row>


            </Container>
        </div>
    )
}

export default Dashboard;