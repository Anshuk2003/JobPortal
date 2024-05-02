"use client"
import JobPostForm from '@/components/JobPostForm'
import PageTitle from '@/components/PageTitle'
import { setLoading } from '@/redux/loaderSlice'
import { Button, Form, message } from 'antd'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

function EditJob() {
  const [jobdata, setJobdata] = useState<any>(null)
  const router = useRouter();
  const { jobid } = useParams();
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    try {
      values._id = jobid;
      dispatch(setLoading(true))
      const response = await axios.put(`/api/jobs/${jobid}`, values)
      message.success(response.data.message)
      router.push("/jobs")
    } catch (error: any) {
      message.error(error.message);
    }
    finally {
      dispatch(setLoading(false))
    }
  }

  const fetchJob = async () => {
    try {
      dispatch(setLoading(true))
      const response = await axios.get(`/api/jobs/${jobid}`);
      setJobdata(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    }
    finally {
      dispatch(setLoading(false))
    }
  };

  useEffect(() => {
    fetchJob();
  }, [])

  return (
    jobdata && <div>
      <div className='flex justify-between items-center'>
        <PageTitle title='Edit Job Post' />
        <Button type='primary'
          onClick={() => router.back()}
        >
          Back
        </Button>
      </div>
      <Form layout="vertical" onFinish={onFinish} initialValues={jobdata}>
        <JobPostForm />

        <div className="flex justify-end items-center gap-3 my-3">
          <Button type="default" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Update Job
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default EditJob
