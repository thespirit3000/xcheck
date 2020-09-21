import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Spin } from 'antd';
import { RootState } from '../../store/rootReducer';
import {
  fetchSessions,
  showModal,
  hideModal,
  startEdit,
  endEdit,
} from '../../store/reducers/crossSessionsSlice';
import { PlusOutlined } from '@ant-design/icons';
import { SessionsTable } from './components/sessionsTable';
import { CrossSessionCreate } from '../crossSessionCreatePage';

export const CrossSessionsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { sessions, loading, isShowModal, isEdit, editData } = useSelector(
    (state: RootState) => state.crossSessions
  );
  const { allTasks } = useSelector((state: RootState) => state.tasks);
  const getData = useCallback(() => {
    dispatch(fetchSessions());
  }, [dispatch]);
  useEffect(() => {
    getData();
  }, [dispatch, getData]);

  function handleClick() {
    dispatch(showModal());
  }

  function closeHandler() {
    dispatch(hideModal());
    if (isEdit) {
      dispatch(endEdit());
    }
  }

  function openHandler(id: string) {
    dispatch(showModal());
    dispatch(startEdit(id));
  }

  return (
    <Spin spinning={loading}>
      <Button
        onClick={() => handleClick()}
        type="primary"
        style={{
          marginBottom: 16,
        }}
        icon={<PlusOutlined />}
      >
        Add a session
      </Button>
      <CrossSessionCreate
        isShowModal={isShowModal}
        closeManager={closeHandler}
        tasks={allTasks}
        isEdit={isEdit}
        editData={editData}
      />
      <SessionsTable sessions={sessions} openRow={openHandler} />
    </Spin>
  );
};
