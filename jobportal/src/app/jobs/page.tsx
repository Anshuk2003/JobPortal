"use client"
import PageTitle from '@/components/PageTitle'
import RecievedApplications from '@/components/RecievedApplication'
import { setLoading } from '@/redux/loaderSlice'
import { Button, Table, Tooltip, message } from 'antd'
import axios from 'axios'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Jobs() {
  const router = useRouter()
  const [selectedJob, setSelectedJob] = useState({} as any)
  const [showApplications, setShowApplications] = useState<boolean>(false)
  const [jobs, setJobs] = useState([])
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.users);

  const fetchJobs = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`/api/jobs?user=${currentUser._id}`);
      // console.log(response.data.data);
      setJobs(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const deleteJob = async (jobId: string) => {
    try {
      dispatch(setLoading(true))
      const response = await axios.delete(`/api/jobs/${jobId}`);
      message.success(response.data.message)
      fetchJobs();
    } catch (error: any) {
      message.error(error.message);
    }
    finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    fetchJobs();
  }, [])

  const columns = [{
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Posted on",
    dataIndex: "createdAt",
    render: (text: any) => moment(text).format("DD-MM-YYYY hh:mm A")
  },
  {
    title: "Location",
    dataIndex: "location",
  },
  {
    title: "Job Type",
    dataIndex: "jobType",
  },
  {
    title: "Work mode",
    dataIndex: "workMode",
  },
  {
    title: "Experience",
    dataIndex: "experience",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    render: (text: any, record: any) => (
      <div className='flex gap-3'>
        <Tooltip title="Delete">
          <i
            className="ri-delete-bin-line"
            onClick={() => deleteJob(record._id)}
          ></i>
        </Tooltip>
        <Tooltip title="Edit">
          <i
            className="ri-pencil-line"
            onClick={() => router.push(`/jobs/edit/${record._id}`)}
          ></i>
        </Tooltip>
        <Tooltip title="Applications">
          <i className="ri-file-list-3-line"
            onClick={() => {
              setSelectedJob(record);
              setShowApplications(true);
            }}
          ></i>
        </Tooltip>
      </div>
    )
  },
  ];
  return (
    <div>
      <div className='flex justify-between items-center'>
        <PageTitle title='Jobs' />
        <Button type='primary'
          onClick={() => router.push("/jobs/new")}
        >
          New Job
        </Button>
      </div>
      <div className="my-3">
        <Table columns={columns} dataSource={jobs} />
      </div>

      {showApplications && (
        <RecievedApplications 
        selectedJob={selectedJob} 
        setShowApplications={setShowApplications} 
        showApplications={showApplications}/>
      )}
    </div>
  )
}

export default Jobs
