import Head from 'next/head'
import Image from 'next/image'
import react, { useContext, useEffect, useState } from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import AuthContext from '@/context/AuthContext'
// import AuthContext from '@/context/AuthContext'
import LoginModal from '@/components/LoginModal';
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios';
import * as configURL from '@/config/index';
import Cookies from 'universal-cookie';
// import Image from 'next/image'
export default function Home() {
  const cookies = new Cookies();
  const decodeUser = cookies.get('dktuser');
  const decodeToken = cookies.get('dkttoken');
  const [modalShow, setModalShow] = useState(false);
  const router = useRouter();
  const context = useContext(AuthContext)
  const { user } = context;
  console.log(decodeUser);
  useEffect(() => {
    console.log('context', context)
    return () => {
    }
  }, [])
  const WhoAmI = async () => {
    let getDetails;
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      getDetails = await axios.post(`/api/whoami`, { number: decodeUser.number, token: decodeToken }, config)
      console.log(getDetails.data);
    }
    catch (err) {
      console.log('=========Error in Index===========================');
      console.log(err.response);
      console.log(err.response.data.error)
      console.log('====================================');
    }
  }
  return (
    <section className="">
      <div className="container h-100">
        <div className='align-items-center gap-2 d-flex flex-column justify-content-center mx-auto my-auto' style={{ height: '80vh' }}>
          <div className='w-full'>
            Welcome to DKT Store!


            {/* <Button variant="primary" onClick={() => WhoAmI()}>Who am i</Button> */}
          </div>
          <div className="">
            <Image
              src="https://picsum.photos/200"
              alt="Picture of the author"
              width={100}
              height={100}
            />
          </div>
          <div className='w-full'>
            {
              user ?
                ""
                :
                <Button variant="primary" onClick={() => setModalShow(true)}>Login</Button>
            }

          </div>
        </div>
        <LoginModal
          // block={true}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    </section>
  )
}
