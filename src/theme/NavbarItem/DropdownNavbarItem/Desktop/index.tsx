import React, {useState, useRef, useEffect, type ReactNode} from 'react';
import clsx from 'clsx';
import NavbarNavLink from '@theme/NavbarItem/NavbarNavLink';
import type {LinkLikeNavbarItemProps} from '@theme/NavbarItem';
import type {Props} from '@theme/NavbarItem/DropdownNavbarItem/Desktop';

type DropdownChildProps = LinkLikeNavbarItemProps & {
  isDropdownItem?: boolean;
  activeClassName?: string;
  onClick?: () => void;
};

declare function require(moduleName: string): {
  default: (props: DropdownChildProps) => ReactNode;
};

// Loaded lazily. A top-level import cycles through NavbarItem and makes
// Rspack throw "factory is undefined".
function DropdownChild(props: DropdownChildProps) {
  const NavbarItem = require('@theme/NavbarItem').default;
  return <NavbarItem {...props} />;
}

export default function DropdownNavbarItemDesktop({
  items,
  position,
  className,
  onClick,
  ...props
}: Props): ReactNode {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent | TouchEvent | FocusEvent,
    ) => {
      if (
        !dropdownRef.current ||
        dropdownRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setShowDropdown(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('focusin', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('focusin', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={clsx('navbar__item', 'dropdown', {
        'dropdown--right': position === 'right',
        'dropdown--show': showDropdown,
      })}>
      <NavbarNavLink
        aria-haspopup="true"
        aria-expanded={showDropdown}
        role="button"
        href={props.to ? undefined : '#'}
        className={clsx('navbar__link', className)}
        {...props}
        onClick={(e) => {
          e.preventDefault();
          setShowDropdown((open) => !open);
          onClick?.(e);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setShowDropdown((open) => !open);
          }
        }}>
        {props.children ?? props.label}
      </NavbarNavLink>
      <ul className="dropdown__menu">
        {items.map((childItemProps, i) => (
          <DropdownChild
            isDropdownItem
            activeClassName="dropdown__link--active"
            {...childItemProps}
            key={i}
            onClick={() => setShowDropdown(false)}
          />
        ))}
      </ul>
    </div>
  );
}
