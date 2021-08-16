import React      from "react"
import { Home }   from "./home"
import { render, screen } from "@testing-library/react"

jest.mock("./FileUpload", () => ({
    FileUpload: () => {
        return (
            <div>
                FileUpload
            </div>
        )
    }
}))

describe("Home", () => {
    it("renders file uploads", () => {

        /* Act */
        render(<Home/>);
        const fileUpload = screen.getByText("FileUpload");

        /* Assert */
        expect(fileUpload).toBeInTheDocument();

    })
})