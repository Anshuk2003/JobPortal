"use client";
import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import PageTitle from "@/components/PageTitle";
import { Button, Col, Divider, Form, Row, Table, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setLoading } from "@/redux/loaderSlice";

function JobInfo() {
  const { currentUser } = useSelector((state: any) => state.users);
  const [jobData, setJobData] =useState<any>(null);
  const [applications = [], setApplications] = useState<any[]>([]);
  const router = useRouter();
  const { jobid } = useParams();
  const dispatch = useDispatch();
  const fetchJob = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`/api/jobs/${jobid}`);
      setJobData(response.data.data);

    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchApplications = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `/api/applications?job=${jobid}&user=${currentUser._id}`
      );
      setApplications(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  React.useEffect(() => {
    fetchJob();
    fetchApplications();
  }, []);

  const onApply = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`/api/applications`, {
        job: jobData._id,
        user: currentUser._id,
        status: "pending",
      });
      message.success(response.data.message);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    jobData && (
      <div>
        <PageTitle title={jobData.title} />
        <Row gutter={[16, 16]} className="gap-3">
          <Col span={12} className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span>Company</span>
              <span>{jobData.user?.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Location</span>
              <span>{jobData.location}</span>
            </div>
            <div className="flex justify-between">
              <span>Salary</span>
              <span>
                {jobData.salaryFromRange} LPA - {jobData.salaryToRange} LPA
              </span>
            </div>
            <div className="flex justify-between">
              <span>Work Mode</span>
              <span>{jobData.workMode}</span>
            </div>
            <div className="flex justify-between">
              <span>Jop Type</span>
              <span>{jobData.jobType}</span>
            </div>
            <div className="flex justify-between">
              <span>Experience Required</span>
              <span>{jobData.experience} Years</span>
            </div>
          </Col>

          <Col span={24} className="flex flex-col gap-2">
            <h1 className="text-md">Job Description</h1>
            <Divider />
            
            <p style={{whiteSpace: 'pre-wrap'}}>{jobData.description}</p>
            {applications.length > 0 && (
              <span className="my-3 info p-3">
                You have already applied for this job. Please wait for the
                employer to respond.
              </span>
            )}
            <div className="flex justify-end gap-3">
              <Button type="default" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button
                type="default"
                onClick={() => router.push(`/userinfo/${jobData.user._id}`)}
              >
                View Company Info
              </Button>
              <Button
                type="primary"
                onClick={onApply}
                disabled={
                  currentUser.userType === "employer" || applications.length > 0
                }
              >
                Apply
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    )
  );
}

export default JobInfo;