
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import Dashboard from './components/Dashboard.tsx';
import CPNList from './components/CPNList.tsx';
import PartogramView from './components/PartogramView.tsx';
import AfyaBot from './components/AfyaBot.tsx';
import ReferralSystem from './components/ReferralSystem.tsx';
import Statistics from './components/Statistics.tsx';
import VaccinationCalendar from './components/VaccinationCalendar.tsx';
import RoleSelector from './components/RoleSelector.tsx';
import Login from './components/Login.tsx';
import CommunityPortal from './components/CommunityPortal.tsx';
import JobRoleSelector from './components/JobRoleSelector.tsx';
import { Role, JobRole, Province, HealthStructure } from './types.ts';

const App: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [selectedStructure, setSelectedStructure] = useState<HealthStructure | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [jobRole, setJobRole] = useState<JobRole | null>(null);
  const [authId, setAuthId] = useState<string>('');

  const handleLogout = () => {
    setIsAuthenticated(false);
    setJobRole(null);
    setAuthId('');
  };

  const handleQuit = () => {
    setIsAuthenticated(false);
    setSelectedRole(null);
    setSelectedProvince(null);
    setSelectedStructure(null);
    setJobRole(null);
    setAuthId('');
  };

  if (!selectedRole) {
    return <RoleSelector 
      onSelect={(role, province, structure) => {
        setSelectedRole(role);
        setSelectedProvince(province || null);
        setSelectedStructure(structure || null);
      }} 
    />;
  }

  if (!isAuthenticated) {
    return (
      <Login 
        role={selectedRole} 
        province={selectedProvince}
        structure={selectedStructure}
        onLogin={(id) => {
          setIsAuthenticated(true);
          setAuthId(id);
        }} 
        onBack={() => {
          setSelectedRole(null);
          setSelectedProvince(null);
          setSelectedStructure(null);
        }} 
      />
    );
  }

  if ((selectedRole === Role.ZONE_DE_SANTE || selectedRole === Role.AIRE_DE_SANTE) && !jobRole) {
    return <JobRoleSelector onSelect={setJobRole} role={selectedRole} />;
  }

  return (
    <Router>
      <Layout 
        role={selectedRole} 
        jobRole={jobRole} 
        onLogout={handleLogout} 
        onQuit={handleQuit}
      >
        <Routes>
          <Route path="/" element={
            selectedRole === Role.COMMUNAUTE 
              ? <CommunityPortal userId={authId} /> 
              : <Dashboard role={selectedRole} jobRole={jobRole} />
          } />
          <Route path="/cpn" element={<CPNList />} />
          <Route path="/partogram" element={<PartogramView />} />
          <Route path="/afyabot" element={<AfyaBot />} />
          <Route path="/referrals" element={<ReferralSystem />} />
          <Route path="/vaccination" element={<VaccinationCalendar userId={authId} />} />
          <Route path="/stats" element={<Statistics />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
