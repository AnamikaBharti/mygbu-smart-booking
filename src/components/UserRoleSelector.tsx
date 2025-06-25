
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface UserRoleSelectorProps {
  selectedRole: string;
  onRoleChange: (role: string) => void;
}

const UserRoleSelector: React.FC<UserRoleSelectorProps> = ({ selectedRole, onRoleChange }) => {
  const roles = [
    { value: 'employee', label: 'Employee', color: 'bg-blue-100 text-blue-800' },
    { value: 'student', label: 'Student', color: 'bg-green-100 text-green-800' },
    { value: 'outsider', label: 'External/Outsider', color: 'bg-orange-100 text-orange-800' }
  ];

  const currentRole = roles.find(role => role.value === selectedRole);

  return (
    <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">User Type:</span>
        <Badge className={currentRole?.color}>
          {currentRole?.label}
        </Badge>
      </div>
      <Select value={selectedRole} onValueChange={onRoleChange}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {roles.map((role) => (
            <SelectItem key={role.value} value={role.value}>
              {role.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="text-xs text-gray-500">
        Pricing will adjust based on your user type
      </span>
    </div>
  );
};

export default UserRoleSelector;
