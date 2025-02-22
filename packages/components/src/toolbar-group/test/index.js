/**
 * External dependencies
 */
import { fireEvent, render, screen } from '@testing-library/react';

/**
 * Internal dependencies
 */
import ToolbarGroup from '../';

describe( 'ToolbarGroup', () => {
	describe( 'basic rendering', () => {
		it( 'should render an empty node, when controls are not passed', () => {
			const { container } = render( <ToolbarGroup /> );

			expect( container ).toBeEmptyDOMElement();
		} );

		it( 'should render an empty node, when controls are empty', () => {
			const { container } = render( <ToolbarGroup controls={ [] } /> );

			expect( container ).toBeEmptyDOMElement();
		} );

		it( 'should render a list of controls with buttons', () => {
			const clickHandler = ( event ) => event;
			const controls = [
				{
					icon: 'wordpress',
					title: 'WordPress',
					onClick: clickHandler,
					isActive: false,
				},
			];

			render( <ToolbarGroup controls={ controls } /> );

			const toolbarButton = screen.getByLabelText( 'WordPress' );
			expect( toolbarButton ).toHaveAttribute( 'aria-pressed', 'false' );
			expect( toolbarButton ).toHaveAttribute( 'type', 'button' );
		} );

		it( 'should render a list of controls with buttons and active control', () => {
			const clickHandler = ( event ) => event;
			const controls = [
				{
					icon: 'wordpress',
					title: 'WordPress',
					onClick: clickHandler,
					isActive: true,
				},
			];

			render( <ToolbarGroup controls={ controls } /> );

			const toolbarButton = screen.getByLabelText( 'WordPress' );
			expect( toolbarButton ).toHaveAttribute( 'aria-pressed', 'true' );
			expect( toolbarButton ).toHaveAttribute( 'type', 'button' );
		} );

		it( 'should render a nested list of controls with separator between', () => {
			const controls = [
				[
					// First set.
					{
						icon: 'wordpress',
						title: 'WordPress',
					},
				],
				[
					// Second set.
					{
						icon: 'wordpress',
						title: 'WordPress',
					},
				],
			];

			const { container } = render(
				<ToolbarGroup controls={ controls } />
			);

			const buttons = screen.getAllByRole( 'button' );
			expect( buttons ).toHaveLength( 2 );
			expect(
				container.querySelector( '.has-left-divider button' )
			).toBe( buttons[ 1 ] );
		} );

		it( 'should call the clickHandler on click.', () => {
			const clickHandler = jest.fn();
			const controls = [
				{
					icon: 'wordpress',
					title: 'WordPress',
					onClick: clickHandler,
					isActive: true,
				},
			];
			render( <ToolbarGroup controls={ controls } /> );

			fireEvent.click( screen.getByLabelText( 'WordPress' ) );
			expect( clickHandler ).toHaveBeenCalledTimes( 1 );
		} );
	} );
} );
