import React from 'react';
import styled from 'styled-components';

const ActivityFeedContainer = styled.div`
  width: 100%;
  background-color: #f9f9f9;
  padding: 20px;
`;

const ActivityFeedContent = styled.div`
  max-height: 300px;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 14px;
`;

const ActivityAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
`;

const ActivityContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActivityText = styled.div`
  margin-bottom: 5px;
  line-height: 1.4;
`;

const ActivityTime = styled.div`
  font-size: 12px;
  color: #888;
`;

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid #e0e0e0;
  margin: 15px 0;
`;

const dummyData = [
  {
    id: 1,
    avatar: 'https://via.placeholder.com/40',
    name: 'Kushantha Charuka',
    action: 'created',
    link: 'Contract #00124',
    description: 'need John Beige’s signature',
    timestamp: 'Sep 16, 2022 at 11:30 AM'
  },
  {
    id: 2,
    avatar: 'https://via.placeholder.com/40',
    name: 'Jane Doe',
    action: '',
    link: '',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pretium neque',
    timestamp: 'Sep 16, 2022 at 11:45 AM'
  },
  {
    id: 3,
    avatar: 'https://via.placeholder.com/40',
    name: 'John Smith',
    action: '',
    link: '',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pretium neque',
    timestamp: 'Sep 16, 2022 at 11:45 AM'
  },
  {
    id: 4,
    avatar: 'https://via.placeholder.com/40',
    name: 'Alice Johnson',
    action: 'updated',
    link: 'Project Plan',
    description: 'added new milestones',
    timestamp: 'Sep 16, 2022 at 12:00 PM'
  },
  {
    id: 5,
    avatar: 'https://via.placeholder.com/40',
    name: 'Michael Brown',
    action: 'commented on',
    link: 'Issue #456',
    description: 'please review the latest updates',
    timestamp: 'Sep 16, 2022 at 12:15 PM'
  },
  {
    id: 6,
    avatar: 'https://via.placeholder.com/40',
    name: 'Emily White',
    action: 'closed',
    link: 'Task #789',
    description: '',
    timestamp: 'Sep 16, 2022 at 12:30 PM'
  },
];

const Activity = () => {
  return (
    <ActivityFeedContainer>
      <ActivityFeedContent>
        {dummyData.map((item, index) => (
          <React.Fragment key={item.id}>
            <ActivityItem>
              <ActivityAvatar src={item.avatar} alt={`${item.name}'s avatar`} />
              <ActivityContent>
                <ActivityText>
                  <strong>{item.name}</strong> {item.action} {item.link && <a href="https://via.placeholder.com/40">{item.link}</a>} {item.description}
                </ActivityText>
                <ActivityTime>{item.timestamp}</ActivityTime>
              </ActivityContent>
            </ActivityItem>
            {index < dummyData.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </ActivityFeedContent>
    </ActivityFeedContainer>
  );
};

export default Activity;
