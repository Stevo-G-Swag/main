import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const Calibrate = () => {
  const authContext = useContext(AuthContext);
  const { user, updateCalibration } = authContext;

  const [calibrationData, setCalibrationData] = useState(user ? user.neuralInterfaceCalibration : {});

  useEffect(() => {
    if (user) {
      setCalibrationData(user.neuralInterfaceCalibration);
    }
  }, [user]);

  const onChange = e => setCalibrationData({ ...calibrationData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    try {
      updateCalibration(calibrationData);
      console.log('Calibration data updated successfully');
    } catch (error) {
      console.error('Error updating calibration data:', error.message);
      console.error(error.stack);
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Neural Interface <span className='text-primary'>Calibration</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='setting1'>Setting 1</label>
          <input
            type='text'
            name='setting1'
            value={calibrationData.setting1 || ''}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='setting2'>Setting 2</label>
          <input
            type='text'
            name='setting2'
            value={calibrationData.setting2 || ''}
            onChange={onChange}
          />
        </div>
        <input
          type='submit'
          value='Save Calibration'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Calibrate;