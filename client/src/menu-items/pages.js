import { UserAddOutlined, EditOutlined, GithubOutlined } from '@ant-design/icons';

const icons = {
  UserAddOutlined,
  EditOutlined,
  GithubOutlined
};

const pages = {
  id: 'pages',
  title: 'Pages',
  type: 'group',
  children: [
    {
      id: 'add-student',
      title: 'Add Student',
      type: 'item',
      url: '/add-student',
      icon: icons.UserAddOutlined
    },
    {
      id: 'edit-student',
      title: 'Edit Student',
      type: 'item',
      url: '/edit-student',
      icon: icons.EditOutlined
    },
    {
      id: 'documentation',
      title: 'Documentation',
      type: 'item',
      url: 'https://github.com/pedrodcarvalho/iot-project/blob/main/README.md',
      icon: icons.GithubOutlined,
      external: true,
      target: true
    }
  ]
};

export default pages;
