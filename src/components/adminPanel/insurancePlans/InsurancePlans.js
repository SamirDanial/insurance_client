import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../../store/auth'
import { EDIT_USER } from '../../hooks/LoginAndRegister';
import { useMutation } from '@apollo/client';

const InsurancePlans = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const profile = useSelector(state => state.auth);
    const [favPlan, setFavePlan] = useState(profile.insurancePlan);
    const [changeInsurancePlan, setChangeInsurancePlan] = useState(false);
    const myInsurancePlan = useSelector(state => state.auth.insurancePlan);
    const [editUser] = useMutation(EDIT_USER, {
        variables: {
            ID: profile._id,
            name: profile.name,
            lastName: profile.lastName,
            insurancePlan: favPlan,
        }
    });

    useEffect(() => {
        setFavePlan(profile.insurancePlan);
    }, [profile.insurancePlan]);

    useEffect(() => {
        let timeInt
        if(changeInsurancePlan) {
            timeInt = setInterval(() => {
                setChangeInsurancePlan(false);
            }, 2000);
        }
        return () => {
            clearInterval(timeInt);
        }
    }, [changeInsurancePlan])

    useEffect(() => {
        if(favPlan !== profile.insurancePlan) {
            editUser().then(res => {
                setChangeInsurancePlan(true);
                dispatch(authActions.edit({
                    name: profile.name,
                    lastName: profile.lastName,
                    insurancePlan: favPlan
                }))
            }).catch(error => {
                console.log(error.message);
            })
        } 
    }, [favPlan, editUser, profile.insurancePlan, dispatch, profile.name, profile.lastName]);

    const insurancePlans = [
        {id: 1, name: "Silver", price: "79", imagePath: "Silver.jpeg" },
        {id: 2, name: "Gold", price: "109", imagePath: "gold.jpeg" },
        {id: 3, name: "Bronz", price: "49", imagePath: "bronze.jpeg" }]
    return (
        <div className="small-container2" style={{ marginTop: "50px" }}>
            {
                changeInsurancePlan && <div style={{position: "absolute", left: "35%", background: "lightblue", padding: "20px 40px", borderRadius: "10px"}}>
                    <h1>Insurace Plan Changed</h1>
                </div>
            }
            <button className='btn' style={{marginLeft: 50}} onClick={() => navigate('/profile')}>PROFILE</button>
            <div className="row">
                {
                    insurancePlans.map((plan) => {
                        var imageName = plan.imagePath;
                        return <div className="col-4 eachProduct" key={plan.id}>
                        <img src={require('../../../img/' + imageName)} alt="" />
                        <div style={{ display: 'flex', flexDirection: "row", justifyContent: "space-around" }}>
                            <h4 style={{fontWeight: myInsurancePlan === plan.id ? "bold": "", color: myInsurancePlan === plan.id ? "purple": ""}}>{plan.name}</h4>
                            <p>{plan.price + "$"}</p>
                        </div>

                        <div style={{ textAlign: "center" }}>
                            <button
                                onClick={() =>
                                    setFavePlan(plan.id)
                                }
                                className="btn"
                                style={{ cursor: "pointer" }}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                    })
                }
            </div>
        </div>
    )
}

export default InsurancePlans
