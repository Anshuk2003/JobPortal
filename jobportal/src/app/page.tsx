"use client"
import Filters from "@/components/Filters";
import { setLoading } from "@/redux/loaderSlice";
import { Col, Divider, Row, message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const [filters, setFilters] = useState({
    searchText: "",
    location: ""
  });
  const [jobs, setJobs] = useState([]);
  const { currentUser } = useSelector((state: any) => state.users)
  const dispatch = useDispatch();
  const router = useRouter()
  const fetchJobs = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`/api/jobs`, { params: filters });
      console.log(response.data.data);
      setJobs(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [])
  return (
    <div>
      <Filters
        filters={filters}
        setFilters={setFilters}
        getData={fetchJobs}
      />
      <Row
        

      >
        {
          jobs.map((job: any) => (
            <Col span={8} className="p-2"
              key={job._id}
              onClick={() => router.push(`/jobinfo/${job._id}`)}
            >
              <div className="card flex flex-col gap-2 py-3 cursor-pointer p-3">
                <h1 className="text-md">{job.title}</h1>
                
                <Divider />

                <div className="flex justify-between">
                  <span>Company</span>
                  <span>{job.user.name}</span>
                </div>

                <div className="flex justify-between">
                  <span>Location</span>
                  <span>{job.location}</span>
                </div>

                <div className="flex justify-between">
                  <span>Salary</span>
                  <span>{job.salaryFromRange} - {job.salaryToRange}</span>
                </div>

                <div className="flex justify-between">
                  <span>Work Mode</span>
                  <span>{job.workMode}</span>
                </div>
              </div>
            </Col>
          ))
        }
      </Row>
    </div>
  );
}


