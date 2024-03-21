import { Box, Button, Group, TextInput, Textarea } from "@mantine/core";

export default function WatchlistMetaDataForm({handleChange, handleSubmit, formData, sendButtonText}){
    return(
                <Box maw={340} mx="auto">
          <form onSubmit={handleSubmit}>
            <TextInput
              withAsterisk
              label="Name"
              name="name"
              placeholder="Enter a name"
              autoComplete="off"
              value={formData.name}
              onChange={handleChange}
            />
            <Textarea
              label="Description"
              name="description"
              placeholder="Enter a description"
              autoComplete="off"
              autosize
              value={formData.description}
              onChange={handleChange}
            />

            <Group justify="flex-end" mt="md">
              <Button
                className="disabled:bg-slate-700 bg-watchlist-green"
                type="submit"
                disabled={formData.name.length < 1}
              >
                {sendButtonText}
              </Button>
            </Group>
          </form>
        </Box>
    )
}