"use client"
import React, { useEffect, useState } from 'react'
import { ConfigProvider, message } from 'antd';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCurrentUser } from '@/redux/userSlice';
import Loaders from './Loaders';
import { setLoading } from '@/redux/loaderSlice';
import { useRouter } from 'next/navigation';


function LayoutProvider({ children }: { children: React.ReactNode }) {
  const { currentUser } = useSelector((state: any) => state.users);
  const { loading } = useSelector((state: any) => state.loaders);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [menuItems, setMenuItems] = useState([
    {
      name: "Home",
      path: "/",
      icon: "ri-home-7-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-shield-user-line",
    },
    {
      name: "Applications",
      path: "/applications",
      icon: "ri-file-list-2-line",
    },
    {
      name: "About us",
      path: "/about",
      icon: "ri-team-line"
    },
    {
      name: "Saved",
      path: "/saved",
      icon: "ri-save-line",
    },
    // {
    //   name: "Recommendation",
    //   path: "/recomendation",
    //   icon: "ri-save-line",
    // }
  ])

  const pathName = usePathname();

  const getCurrentUser = async () => {
    try {
      dispatch(setLoading(true))
      const response = await axios.get('/api/users/currentuser');
      const isEmployer = response.data.data.userType === "employer";
      if (isEmployer) {
        const tempMenuItems: any = menuItems
        tempMenuItems[2].name = 'Posted Jobs'
        tempMenuItems[2].path = "/jobs"
        setMenuItems(tempMenuItems);
        tempMenuItems[4].name = ''
        tempMenuItems[4].path = ""
        tempMenuItems[4].icon = ""
        setMenuItems(tempMenuItems);
      }
      if (!isEmployer) {
        const tempMenuItems: any = menuItems
        tempMenuItems[4].name = 'Recommendation'
        tempMenuItems[4].path = "/recomendation"
        setMenuItems(tempMenuItems);
      }
      dispatch(setCurrentUser(response.data.data))
    } catch (error: any) {
      router.push('/login');
      message.error(error.response.data.message || "Something went wrong")
      message.error("Please clear your cookies and try again")
    }
    finally {
      dispatch(setLoading(false))
    }
  }
  useEffect(() => {
    if (pathName !== "/login" && pathName !== "/register" && !currentUser) {
      getCurrentUser()
    }
  }, [pathName])

  const onLogout = async () => {
    try {
      dispatch(setLoading(true));
      await axios.post("/api/users/logout");
      message.success("Logged out successfully");
      dispatch(setCurrentUser(null));
      router.push("/login");
    } catch (error: any) {
      message.error(error.response.data.message || "Something went wrong")
    }
    finally {
      dispatch(setLoading(false));
    }
  }


  return (
    <html lang="en">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" rel="stylesheet" />
      </head>
      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#213555",
            },
          }}
        >
          {loading && <Loaders />}
          {/* if route is public(login/register) dont show layout */}
          {pathName === "/login" || pathName == "/register" || pathName== "/verifyemail" ? (
            <div>
              {children}
            </div>
          ) : (
            currentUser && (
            <div className='layout-parent'>
               {currentUser.isVerified ? (
                  <>
              <div className="sidebar" 
              style={{width: isSidebarExpanded ? "350px":"auto"}}
              >
                <div className='logo'>
                  {isSidebarExpanded && <img width="40" height="40" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs5KdGoeO-6NRegLC26rw5gM0h0dkXKV6osRfHA5Bswg&s" alt="permanent-job" />}
                  {isSidebarExpanded && <h1>Job Hunt</h1>}
                  {!isSidebarExpanded && (
                    <div className='short'>
                      <img width="40" height="40" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs5KdGoeO-6NRegLC26rw5gM0h0dkXKV6osRfHA5Bswg&s" alt="permanent-job" />
                      <i
                        className="ri-menu-2-line"
                        onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                      ></i>
                    </div>
                  )}
                  {isSidebarExpanded && (
                    <i
                      className="ri-close-line"
                      onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                    ></i>
                    )}
                </div>

                <div className='menu-items'>
                  {
                    menuItems.map((item, index) => {
                      const isActive = (pathName === item.path)
                      return <div className={`menu-item 
                      ${isActive ? "active-menu-item" : ""}`}
                        style={{
                          justifyContent: isSidebarExpanded
                            ? "flex-start"
                            : "center"
                        }}
                        key={index}
                        onClick={() => router.push(item.path)}
                      >
                        <i className={item.icon}></i>
                        <span>
                          {isSidebarExpanded && item.name}
                        </span>
                      </div>
                    })
                  }
                </div>

                <div className='user-info flex justify-between'>
                  {isSidebarExpanded && (
                    <div className='flex flex-col'>
                      <span>
                        {currentUser?.name}
                      </span>
                      <span>
                        {currentUser?.userType === "employer" ? "Employer" : "Employee"}
                      </span>
                    </div>)
                  }
                  <i className="ri-logout-box-r-line" onClick={onLogout}></i>
                </div>
              </div>


              <div className="body">
                    {children }
                    </div>
                  </>
                 ) : (
                    <div style={styles.verificationMessage}>
                      Please verify your email to access this content!
                      <br/>
                      Go to your registered mail click on link or copy paste link and get started.
                    </div>
                  )}
            </div>)
          )}
        </ConfigProvider>
      </body>
    </html>
  )
}

const styles = {
  verificationMessage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width:"100vw",
    fontSize: '20px',
    color: '#721c24',
    backgroundColor: '#f8d7da',
    border: '1px solid #f5c6cb',
    borderRadius: '5px',
    padding: '20px',
  }
};


export default LayoutProvider
