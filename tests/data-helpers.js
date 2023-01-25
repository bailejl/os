module.exports.getData = () => {
  const randomString = Date.now();
  const tenant1234AdminUID = 'YbcBUFPok4bIYa5JrdXVn3rs0nEf';
  const tenant6789AdminUID = 'OEMVZE6BcV9nE3UZkXJIxzgXcHSr';
  const tenant6789CreatorUID = 'Cf29y4F884O2ZtQb9IN17TsErWbx';
  const owowAdminUID = 'xouqfuaMxh3lSF51GsPX94zoxnzh';

  return {
    docIds: {
      tenant6789AdminUID: tenant6789AdminUID,
      tenant6789CreatorUID: tenant6789CreatorUID,
      tenant1234AdminUID: tenant1234AdminUID,
      owowAdminUID: owowAdminUID
    },
    data: {
      [`/users/${tenant6789AdminUID}`]: {
        displayName: 'Jay Smith',
        roles: ['admin', 'creator', 'editor', 'commenter'],
        tenantId: 'test-6789'
      },
      [`/users/${tenant6789CreatorUID}`]: {
        displayName: 'Tom Smith',
        roles: ['creator'],
        tenantId: 'test-6789'
      },
      [`/users/${tenant1234AdminUID}`]: {
        displayName: 'Jay Smith',
        roles: ['admin', 'creator', 'editor', 'commenter'],
        tenantId: 'test-1234'
      },
      [`/users/${owowAdminUID}`]: {
        tenantId: 'owow',
        roles: ['admin'],
        displayName: 'Kay Smith'
      },
      [`/core-rbac/tenant6789Admin`]: {
        tenantId: 'test-6789',
        role: 'admin',
        nav: [
          {
            href: '/dashboard',
            icon: 'HomeIcon',
            name: 'Dashboard'
          },
          {
            href: '/handbook',
            icon: 'FolderIcon',
            name: 'Handbook'
          }
        ]
      },
      [`/core-rbac/tenant1234Admin`]: {
        tenantId: 'test-1234',
        role: 'admin',
        nav: [
          {
            href: '/dashboard',
            icon: 'HomeIcon',
            name: 'Dashboard'
          },
          {
            href: '/handbook',
            icon: 'FolderIcon',
            name: 'Handbook'
          }
        ]
      },
      [`/core-rbac/tenant6789Creator`]: {
        tenantId: 'test-6789',
        role: 'creator',
        nav: [
          {
            href: '/dashboard',
            icon: 'HomeIcon',
            name: 'Dashboard'
          },
          {
            href: '/handbook',
            icon: 'FolderIcon',
            name: 'Handbook'
          }
        ]
      },
      [`/core-rbac/owowAdmin`]: {
        tenantId: 'owow',
        role: 'admin',
        nav: [
          {
            href: '/dashboard',
            icon: 'HomeIcon',
            name: 'Dashboard'
          },
          {
            href: '/handbook',
            icon: 'FolderIcon',
            name: 'Handbook'
          }
        ]
      }
    }
  };
};
