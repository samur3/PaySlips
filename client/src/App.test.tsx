import React                   from "react"
import { App }                 from "./App"
import { createMemoryHistory } from "history"
import { render, screen }      from "@testing-library/react"
import { Router }              from "react-router-dom"
import { renderWithRouter }    from "./testHelpers";

jest.mock('./modules/home/home', () => ({ Home: () => <div>Home</div> }))

describe("App", () => {
    it("renders header successfully", () => {

        /* Arrange */
        const history = createMemoryHistory()

        /* Act */
        render(
            <Router history={history}>
                <App />
            </Router>
        )
        const header = screen.getByText("Generate Pay Slips");

        /* Assert */
        expect(header).toBeInTheDocument();
    })

    describe("routing", () => {
        it("renders home page on '/'", () => {

            /* Act */
            const { container } = renderWithRouter(
                () => <App />,
                "/"
            )

            /* Assert */
            expect(container.innerHTML).toMatch("Home")
        })

        it("renders 'page not found' message on nonexistent route", () => {

            /* Act */
            const { container } = renderWithRouter(
                () => <App />,
                "/this-route-does-not-exist"
            )

            /* Assert */
            expect(container.innerHTML).toMatch("Page not found")
        })
    })
})
