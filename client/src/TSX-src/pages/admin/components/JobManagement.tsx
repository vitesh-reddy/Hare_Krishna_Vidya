import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Label } from '../../../components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import {
  PlusCircle,
  Edit3,
  Trash2,
  Save,
  X,
  Users,
  Eye,
  ToggleRight,
  ToggleLeft,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useJobAdminContext } from '../../../../contexts/JobContextAdmin';
import Loader from '../../../../components/common/Loader';
import { ThreeDot } from 'react-loading-indicators';

const JobManagement = () => {
  const {
    jobs,
    applications,
    hasMoreJobs,
    hasMoreApplications,
    isLoadingJobs,
    isLoadingApplications,
    fetchJobs,
    fetchApplications,
    createJob,
    updateJob,
    toggleJobStatus,
    setApplications,
    deleteJob,
    updateApplicationStatus,
  } = useJobAdminContext();

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingApplications, setViewingApplications] = useState(null);
  const [jobSkip, setJobSkip] = useState(0);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [applicationSkip, setApplicationSkip] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: '',
    description: '',
    requirements: '',
    skills: [],
  });
  const [skillInput, setSkillInput] = useState('');
  const [viewingApplication, setViewingApplication] = useState(null);

  useEffect(() => {
    if (jobs.length === 0 && !isLoadingJobs) fetchJobs(0, 10);
    console.log('Job Management Rendered');
  }, []);

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] });
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const validateForm = () => {
    if (!formData.title?.trim()) return 'Job title is required';
    if (!formData.description?.trim()) return 'Description is required';
    if (!formData.location?.trim()) return 'Location is required';
    if (!formData.type?.trim()) return 'Job type is required';
  };

  const handleSave = async () => {
    const errMessage = validateForm();
    if (errMessage) {
      toast.error(errMessage);
      return;
    }

    try {
      if (editingId) {
        await updateJob(editingId, formData);
        setEditingId(null);
        setIsCreating(null);
      } else {
        await createJob(formData);
        setIsCreating(null);
      }
      setFormData({
        title: '',
        location: '',
        type: '',
        description: '',
        requirements: '',
        skills: [],
      });
    } catch (error) {
      console.error('Error saving job:', error);
      toast.error(error.response?.data?.error || 'Failed to save job');
    }
  };

  const handleDelete = async (id) => {
    setJobToDelete(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (jobToDelete) {
      try {
        await deleteJob(jobToDelete);
        setShowDeleteDialog(false);
      } catch (error) {
        console.error('Error deleting job:', error);
      }
      setJobToDelete(null);
    }
  };
  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setJobToDelete(null);
  };

  const handleEdit = (job) => {
    setFormData({
      title: job.title || '',
      location: job.location || '',
      type: job.type || '',
      description: job.description || '',
      requirements: job.requirements || '',
      skills: job.skills || [],
    });
    setEditingId(job._id);
    setIsCreating(true);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setViewingApplications(null);
    setFormData({
      title: '',
      location: '',
      type: '',
      description: '',
      requirements: '',
      skills: [],
    });
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await toggleJobStatus(id, currentStatus);
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const loadMoreJobs = () => {
    if (isLoadingJobs) return;
    const newSkip = jobSkip + 10;
    setJobSkip(newSkip);
    fetchJobs(newSkip, 10);
  };

  const loadMoreApplications = () => {
    const newSkip = applicationSkip + 10;
    setApplicationSkip(newSkip);
    fetchApplications(viewingApplications._id, newSkip, 10);
  };

  const handleViewApplication = (applicantId) => {
    setViewingApplication({ id: applicantId });
  };

  if (viewingApplications) {
    const jobApplications = applications.filter((app) => app.jobId === viewingApplications._id);
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Applications for {viewingApplications.title}</h2>
            <p className="text-gray-600">{viewingApplications.noOfApplications} applications received</p>
          </div>
          <Button
            onClick={() => {
              setViewingApplications(null);
              setApplications([]);
              setApplicationSkip(0);
            }}
            variant="outline"
          >
            <X className="w-4 h-4 mr-2" />
            Back to Jobs
          </Button>
        </div>

        <Card>
          <CardContent>
            {!jobApplications.length && !isLoadingApplications ? (
              <div className="text-center py-6 text-gray-500">
                No applications received for this job
              </div>
            ) : !jobApplications.length && isLoadingApplications ? (
              <div className="w-full flex items-center justify-center mt-[2rem] h-[5rem] ">
                <ThreeDot color="#fa7000" size="medium" text="" textColor="" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobApplications.map((applicant) => (
                    <TableRow key={applicant._id}>
                      <TableCell className="font-medium">{applicant.fullname}</TableCell>
                      <TableCell>{applicant.email}</TableCell>
                      <TableCell>{new Date(applicant.appliedDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <select
                          value={applicant.status}
                          onChange={(e) => updateApplicationStatus(applicant._id, e.target.value)}
                          className={`px-2 py-1 rounded-full text-xs border-0 ${
                            applicant.status === 'shortlisted'
                              ? 'bg-green-100 text-green-600'
                              : applicant.status === 'rejected'
                                ? 'bg-red-100 text-red-600'
                                : 'bg-yellow-100 text-yellow-600'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="shortlisted">Shortlisted</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewApplication(applicant._id)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
        {hasMoreApplications && jobApplications.length > 0 && (
          <div className="w-full flex justify-center pb-[2rem]">
            <button
              onClick={loadMoreApplications}
              disabled={isLoadingApplications}
              className={`font-semibold rounded-[0.5rem] transition-colors duration-200 cursor-pointer inline-flex items-center shadow-xl justify-center bg-[#fefefe]/80 backdrop-blur-3xl text-[#111] text-[0.75rem] sm:text-lg px-[2rem] py-4 space-x-2 hover:bg-[#eee] focus:ring-[#e76f51] ${
                isLoadingJobs ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoadingApplications ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
        <ApplicationDialog
          open={viewingApplication}
          setOpen={setViewingApplication}
          updateApplicationStatus={updateApplicationStatus}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this Job Posting? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={cancelDelete}
                className="text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                No
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      )}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Job Postings</CardTitle>
          <Button onClick={() => setIsCreating(true)} className="bg-orange-600 hover:bg-orange-700">
            <PlusCircle className="w-4 h-4 mr-2" />
            New Job
          </Button>
        </CardHeader>
        <CardContent>
          {isCreating && (
            <div className="mb-6 p-6 border rounded-lg bg-gray-50">
              <h3 className="text-lg font-semibold mb-4">
                {editingId ? 'Edit Job' : 'Create New Job'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Job title"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Job location"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Job Type</Label>
                  <Input
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    placeholder="Full-time, Part-time, etc."
                  />
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="skills">Required Skills</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    id="skills"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="Add a skill"
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <Button type="button" onClick={addSkill} variant="outline">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="text-orange-400 hover:text-orange-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Job description"
                  rows={4}
                />
              </div>
              <div className="mt-4">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  placeholder="Job requirements"
                  rows={4}
                />
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button onClick={handleCancel} variant="outline">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {!jobs.length && !isLoadingJobs ? (
            <div className="text-center py-6 text-gray-500">No jobs available</div>
          ) : !jobs.length && isLoadingJobs ? (
            <div className="w-full flex items-center justify-center h-[7rem] ">
              <ThreeDot color="#fa7000" size="medium" text="" textColor="" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead>Applications</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job._id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{job.type}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {job.skills?.slice(0, 1).map((skill, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.skills?.length > 1 && (
                          <span className="text-gray-500 text-xs">+{job.skills.length - 1}</span>
                        )}
                        {!job?.skills?.length && (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            No Skills
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setViewingApplications(job);
                          fetchApplications(job._id, 0, 10);
                          setApplicationSkip(0);
                        }}
                        className="flex items-center gap-2"
                      >
                        <Users className="w-4 h-4" />
                        {job.noOfApplications || 0}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleStatus(job._id, job.status)}
                        className="flex items-center gap-2"
                      >
                        {job.status === 'active' ? (
                          <>
                            <ToggleRight className="w-4 h-4 text-green-600" />
                            Active
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="w-4 h-4 text-gray-400" />
                            Inactive
                          </>
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(job)}>
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(job._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      {hasMoreJobs && jobs.length > 0 && (
        <div className="w-full flex justify-center pb-[2rem]">
          <button
            onClick={loadMoreJobs}
            disabled={isLoadingJobs}
            className={`font-semibold rounded-[0.5rem] transition-colors duration-200 cursor-pointer inline-flex items-center shadow-xl justify-center bg-[#fefefe]/80 backdrop-blur-3xl text-[#111] text-[0.75rem] sm:text-lg px-[2rem] py-4 space-x-2 hover:bg-[#eee] focus:ring-[#e76f51] ${
              isLoadingJobs ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoadingJobs ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default JobManagement;

const ApplicationDialog = ({ open, setOpen, updateApplicationStatus }) => {
  const { getApplicationById } = useJobAdminContext();
  const [application, setApplication] = useState(null);

  useEffect(() => {
    if (!open || !open.id) {
      setApplication(null);
      return;
    }

    const fetchApplication = async () => {
      try {
        const data = await getApplicationById(open.id);
        setApplication(data);
      } catch (error) {
        console.error('Error fetching application:', error);
        toast.error('Failed to fetch application');
      }
    };

    fetchApplication();
  }, [open, getApplicationById]);

  const handleStatusChange = async (status) => {
    if (!application) return;
    try {
      await updateApplicationStatus(application._id, status);
      setApplication((prev) => ({ ...prev, status }));
    } catch (error) {
      console.error('Error updating application status:', error);
      toast.error('Failed to update application status');
    }
  };

  if (!application) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-[1rem] transition-all duration-300">
      <div className="bg-white rounded-[1rem] shadow-[0_5px_20px_rgba(0,0,0,0.1)] w-full max-w-[600px] p-[1.5rem] border border-gray-100">
        <div className="mb-[1.25rem] border-b border-gray-100 pb-[0.75rem]">
          <h2 className="text-[1.5rem] font-[700] text-gray-900 mb-[0.15rem]">
            Application Details
          </h2>
          <p className="text-gray-500 text-[0.85rem]">Review applicant information</p>
        </div>

        <div className="space-y-[1rem] text-[0.9rem]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1rem]">
            <div>
              <label className="block font-[600] mb-[0.25rem] text-gray-600 text-[0.8rem] uppercase tracking-[0.3px]">
                Full Name
              </label>
              <p className="text-gray-800 text-[0.95rem] font-[500]">{application.fullname}</p>
            </div>
            <div>
              <label className="block font-[600] mb-[0.25rem] text-gray-600 text-[0.8rem] uppercase tracking-[0.3px]">
                Email
              </label>
              <a
                href={`mailto:${application.email}`}
                className="text-blue-600 hover:underline text-[0.95rem] font-[500] transition-colors duration-200"
              >
                {application.email}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1rem]">
            <div>
              <label className="block font-[600] mb-[0.25rem] text-gray-600 text-[0.8rem] uppercase tracking-[0.3px]">
                Job Title
              </label>
              <p className="text-gray-800 text-[0.95rem] font-[500]">
                {application.jobId?.title || 'N/A'}
              </p>
            </div>
            <div>
              <label className="block font-[600] mb-[0.25rem] text-gray-600 text-[0.8rem] uppercase tracking-[0.3px]">
                Applied Date
              </label>
              <p className="text-gray-800 text-[0.95rem] font-[500]">
                {new Date(application.appliedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>

          <div>
            <label className="block font-[600] mb-[0.25rem] text-gray-600 text-[0.8rem] uppercase tracking-[0.3px]">
              Profile URL
            </label>
            {application.profileUrl ? (
              <a
                href={application.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-[0.95rem] font-[500] transition-colors duration-200 break-all"
              >
                {application.profileUrl}
              </a>
            ) : (
              <p className="text-gray-500 text-[0.95rem]">Not provided</p>
            )}
          </div>

          <div>
            <label className="block font-[600] mb-[0.25rem] text-gray-600 text-[0.8rem] uppercase tracking-[0.3px]">
              Cover Letter
            </label>
            <div className="bg-gray-50 rounded-[0.5rem] p-[1rem] border border-gray-200">
              <p className="text-gray-700 leading-[1.6] whitespace-pre-line text-[0.9rem]">
                {application.coverLetter || 'Not provided'}
              </p>
            </div>
          </div>

          <div>
            <label className="block font-[600] mb-[0.25rem] text-gray-600 text-[0.8rem] uppercase tracking-[0.3px]">
              Status
            </label>
            <select
              value={application.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className={`px-[0.8rem] py-[0.5rem] rounded-[0.4rem] text-[0.85rem] flex justify-center border-[1.5px] appearance-none font-[600] cursor-pointer transition-all duration-200
                  ${
                    application.status === 'shortlisted'
                      ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                      : application.status === 'rejected'
                        ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                        : 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100'
                  }`}
            >
              <option value="pending">Pending</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="mt-[1.75rem] pt-[0.75rem] border-t border-gray-100 flex justify-end">
          <button
            onClick={() => setOpen(null)}
            className="px-[1.25rem] py-[0.5rem] border border-gray-300 text-gray-700 rounded-[0.4rem] hover:bg-gray-50 transition-all duration-200 font-[600] text-[0.9rem]"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};
