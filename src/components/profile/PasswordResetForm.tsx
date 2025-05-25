
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Shield, Eye, EyeOff, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PasswordResetForm: React.FC = () => {
  const { toast } = useToast();
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^A-Za-z0-9]/.test(password)) strength += 10;
    return Math.min(strength, 100);
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswords(prev => ({ ...prev, [field]: value }));
    
    if (field === 'new') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const togglePasswordVisibility = (field: string) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 30) return 'bg-destructive';
    if (passwordStrength < 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 30) return 'Weak';
    if (passwordStrength < 60) return 'Medium';
    return 'Strong';
  };

  const isFormValid = () => {
    return passwords.current && 
           passwords.new && 
           passwords.confirm && 
           passwords.new === passwords.confirm &&
           passwordStrength >= 60;
  };

  const handleUpdatePassword = () => {
    if (!isFormValid()) {
      toast({
        title: "Validation Error",
        description: "Please ensure all fields are filled and passwords match.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Password Updated",
      description: "Your password has been successfully updated.",
    });

    // Reset form
    setPasswords({ current: '', new: '', confirm: '' });
    setPasswordStrength(0);
  };

  const passwordRequirements = [
    { text: 'At least 8 characters', met: passwords.new.length >= 8 },
    { text: 'Contains lowercase letter', met: /[a-z]/.test(passwords.new) },
    { text: 'Contains uppercase letter', met: /[A-Z]/.test(passwords.new) },
    { text: 'Contains number', met: /[0-9]/.test(passwords.new) },
    { text: 'Contains special character', met: /[^A-Za-z0-9]/.test(passwords.new) },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-hopelink-primary" />
          Reset Password
        </CardTitle>
        <CardDescription>
          Update your password to keep your account secure
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Password */}
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Current Password</Label>
          <div className="relative">
            <Input
              id="currentPassword"
              type={showPasswords.current ? 'text' : 'password'}
              value={passwords.current}
              onChange={(e) => handlePasswordChange('current', e.target.value)}
              placeholder="Enter your current password"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => togglePasswordVisibility('current')}
            >
              {showPasswords.current ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showPasswords.new ? 'text' : 'password'}
              value={passwords.new}
              onChange={(e) => handlePasswordChange('new', e.target.value)}
              placeholder="Enter your new password"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => togglePasswordVisibility('new')}
            >
              {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>
          
          {/* Password Strength Indicator */}
          {passwords.new && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Password Strength:</span>
                <span className={`font-medium ${passwordStrength >= 60 ? 'text-green-600' : passwordStrength >= 30 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {getPasswordStrengthText()}
                </span>
              </div>
              <Progress value={passwordStrength} className="h-2" />
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showPasswords.confirm ? 'text' : 'password'}
              value={passwords.confirm}
              onChange={(e) => handlePasswordChange('confirm', e.target.value)}
              placeholder="Confirm your new password"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => togglePasswordVisibility('confirm')}
            >
              {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>
          {passwords.confirm && passwords.new !== passwords.confirm && (
            <p className="text-sm text-destructive">Passwords do not match</p>
          )}
        </div>

        {/* Password Requirements */}
        {passwords.new && (
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Password Requirements:</Label>
            <div className="space-y-1">
              {passwordRequirements.map((req, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  {req.met ? (
                    <Check size={14} className="text-green-500" />
                  ) : (
                    <X size={14} className="text-gray-400" />
                  )}
                  <span className={req.met ? 'text-green-600' : 'text-gray-500'}>
                    {req.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button 
          onClick={handleUpdatePassword} 
          disabled={!isFormValid()}
          className="w-full hover-scale"
        >
          <Shield size={16} className="mr-2" />
          Update Password
        </Button>
      </CardContent>
    </Card>
  );
};

export default PasswordResetForm;
