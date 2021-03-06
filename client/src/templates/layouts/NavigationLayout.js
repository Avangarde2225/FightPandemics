import { Drawer, List, Button, WhiteSpace } from "antd-mobile";
import { Typography } from "antd";

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { getInitialsFromFullName } from "utils/userInfo";
import TextAvatar from "components/TextAvatar";
import Header from "components/Header";
import Footnote from "components/Footnote";
import CookieAlert from "components/CookieAlert";
import Main from "./Main";
import MobileTabs from "./MobileTabs";
import { theme } from "constants/theme";
import GTM from "constants/gtm-tags";

const { royalBlue, tropicalBlue, white } = theme.colors;

const drawerStyles = {
  position: "relative",
  overflow: "hidden",
  WebkitOverflowScrolling: "touch",
};

const sidebarStyle = {
  background: `${royalBlue}`,
};

const MenuContainer = styled.div`
  width: 63vw !important;
  overflow: hidden;
  @media screen and (min-width: 1024px) {
    width: 20vw !important;
  }
`;

const NavList = styled(List)`
  & .am-list-body {
    background: unset;
    border-width: 0 !important;
    position: absolute;
    width: 100%;
    & div:not(:last-child) {
      & .am-list-line {
        border-bottom: 0;
      }
    }
    &::after {
      height: 0px !important;
    }

    &::before {
      height: 0px !important;
    }
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavItem = styled(List.Item)`
  background: unset;
  padding-left: 2.1rem;
  height: ${(props) => props.height ?? "inherit"};
  & .am-list-line {
    border-bottom: 0;
    &:after {
      height: 0 !important;
    }
    & .am-list-content {
      color: ${white};
      cursor: pointer;
      font-family: "Poppins", sans-serif;
      font-size: 2.4rem;
      font-weight: 600;
      line-height: 6rem;
      padding: 0;
    }
  }

  &.am-list-item-active {
    background: ${tropicalBlue};
  }
`;

const NavItemBrief = styled(NavItem)`
  padding-left: 2.75rem;
  & .am-list-line {
    border-bottom: 0;
    &:after {
      height: 0 !important;
    }
    & .am-list-content {
      font-size: 1.8rem;
      font-weight: normal;
      line-height: 3.5rem;
    }
  }
`;

const UserName = styled(Typography.Text)`
  padding: 1.2rem 1.2rem;
  font-family: Poppins;
  font-size: 1.6rem;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.4px;
  color: ${white};
`;

const Space = styled.div`
  height: ${(props) => props.height ?? "1rem"};
`;

const CloseNav = styled(Button).attrs((props) => ({
  inline: true,
  icon: "cross",
  size: "lg",
}))`
  background: unset;
  border-width: 0 !important;
  border-radius: 0;
  color: ${white};
  cursor: pointer;
  font-size: 2rem;
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
  z-index: 300;

  &.am-button-active {
    background: none;
    color: ${white};
  }
  &::before {
    display: none;
  }

  .am-icon {
    stroke-width: 0.2rem;
    stroke: ${white};
  }
`;

const BriefLink = styled(Link)`
  font-size: 1.8rem;
  font-weight: normal;
  line-height: 4.5rem;
`;

const DividerLine = styled.div`
  height: 0.1px;
  background-color: ${white};
  margin-left: 1rem;
  margin-bottom: 1rem;
`;

const AvatarInitials = styled(Typography.Text)`
  font-family: Poppins;
  font-size: 3.29rem;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
`;

const NavigationLayout = (props) => {
  const { authLoading, mobiletabs, tabIndex, isAuthenticated, user } = props;
  const history = useHistory();
  const [drawerOpened, setDrawerOpened] = useState(false);

  const displayInitials = (user) => {
    if (user?.firstName && user?.lastName) {
      return (
        <AvatarInitials>
          {getInitialsFromFullName(`${user.firstName} ${user.lastName}`)}
        </AvatarInitials>
      );
    }
  };

  const displayFullName = (user) =>
    user ? `${user?.firstName} ${user?.lastName}` : "";

  const toggleDrawer = () => {
    setDrawerOpened(!drawerOpened);
  };

  const AuthenticatedMenu = () => (
    <>
      <WhiteSpace size="lg" />
      <AvatarContainer>
        <NavItem history={history}>
          <TextAvatar size={80} alt="avatar">
            {displayInitials(user)}
          </TextAvatar>
        </NavItem>
        <UserName>{displayFullName(user)}</UserName>
      </AvatarContainer>
      <DividerLine />
      <NavItem history={history}>
        <Link to={`/profile/${user?.id}`}>Profile</Link>
      </NavItem>
      <NavItem>
        Organisation
        {user?.organisations?.length > 0
          ? user?.organisations?.map((organisation) => (
              <NavItemBrief history={history} key={organisation._id}>
                <Link to={`/organisation/${organisation._id}`}>
                  {organisation.name}
                </Link>
              </NavItemBrief>
            ))
          : null}
        <NavItemBrief>
          <Link
            id={GTM.nav.prefix + GTM.nav.addOrg}
            to="/create-organisation-profile"
          >
            + Add Organisation
          </Link>
        </NavItemBrief>
      </NavItem>
      <NavItem history={history}>
        <Link
          id={GTM.nav.prefix + GTM.nav.feed}
          to={{
            pathname: "/feed",
            user,
          }}
        >
          Help Board
        </Link>
      </NavItem>
      <NavItem history={history}>
        <Link id={GTM.nav.prefix + GTM.nav.aboutUs} to="/about-us">
          About Us
        </Link>
      </NavItem>
      <Space height="12rem" />
      <NavItem history={history}>
        <BriefLink to="/auth/logout">Sign Out</BriefLink>
      </NavItem>
    </>
  );

  const UnAuthenticatedMenu = () => (
    <>
      <NavItem history={history}>
        <Link id={GTM.nav.prefix + GTM.nav.login} to="/auth/login">
          Sign In / Join Now
        </Link>
      </NavItem>
      <NavItem history={history}>
        <Link id={GTM.nav.prefix + GTM.nav.aboutUs} to="/about-us">
          About Us
        </Link>
      </NavItem>
    </>
  );

  const DrawerMenu = () => (
    <MenuContainer>
      {drawerOpened && <CloseNav onClick={toggleDrawer} />}
      <NavList>
        {!authLoading && isAuthenticated ? (
          <AuthenticatedMenu />
        ) : (
          <UnAuthenticatedMenu />
        )}
      </NavList>
    </MenuContainer>
  );

  const renderNavigationBar = () => {
    return (
      <div>
        <Drawer
          style={{
            minHeight: document.documentElement.clientHeight,
            ...drawerStyles,
          }}
          enableDragHandle
          open={drawerOpened}
          onOpenChange={toggleDrawer}
          position="right"
          sidebar={DrawerMenu()}
          sidebarStyle={sidebarStyle}
          className="app-drawer"
        >
          <Header
            authLoading={authLoading}
            onMenuClick={toggleDrawer}
            isAuthenticated={isAuthenticated}
            user={user}
          />
          {mobiletabs ? (
            <MobileTabs tabIndex={tabIndex} childComponent={props.children} />
          ) : null}
          <Main>
            <props.component {...props} />
          </Main>
          <Footnote />
          <CookieAlert />
        </Drawer>
      </div>
    );
  };

  return <>{renderNavigationBar()}</>;
};

export default NavigationLayout;
