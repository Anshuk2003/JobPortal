"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setLoading } from "@/redux/loaderSlice";
import { useParams } from "next/navigation";
import axios from "axios";
import { message } from "antd";
import PageTitle from "@/components/PageTitle";
import EmployerInfo from "@/components/EmployerInfo";
import EmployeeInfo from "@/components/EmployeeInfo";
import { useDispatch } from "react-redux";


function UserInfo() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const { userid } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  console.log(userid);

  const fetchUserInfo = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`/api/users/${userid}`);
      setUserInfo(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    userInfo && (
      <div>
        <PageTitle
          title={`${userInfo.userType === "employer" ? "About Company" : "Candidate Profile"
            }`}
        />

        {userInfo.userType === "employer" ? (
          <EmployerInfo employerInfo={userInfo}/>
        ) : (
          <EmployeeInfo employeeInfo={userInfo}/>
        )}
      </div>
    )
  );
}

export default UserInfo;