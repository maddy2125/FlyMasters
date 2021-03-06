USE [FLYMASTERS]
GO
/****** Object:  Table [dbo].[tblUser]    Script Date: 03/17/2019 21:11:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[tblUser](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](50) NULL,
	[Password] [varchar](50) NULL,
	[FirstName] [varchar](50) NULL,
	[LastName] [varchar](50) NULL,
	[IsActive] [bit] NULL,
	[Phone] [varchar](15) NULL,
	[Email] [varchar](100) NULL,
	[CreateDate] [datetime] NULL,
	[CreatedBy] [int] NULL,
 CONSTRAINT [PK_tblUser] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[tblStatus]    Script Date: 03/17/2019 21:11:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[tblStatus](
	[StatusID] [int] IDENTITY(1,1) NOT NULL,
	[StatusName] [varchar](50) NULL,
 CONSTRAINT [PK_tblStatus] PRIMARY KEY CLUSTERED 
(
	[StatusID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[tblSource]    Script Date: 03/17/2019 21:11:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[tblSource](
	[SourceId] [int] IDENTITY(1,1) NOT NULL,
	[SourceName] [varchar](50) NOT NULL,
	[Description] [varchar](500) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreateDate] [date] NULL,
	[CreatedBy] [int] NULL,
 CONSTRAINT [PK_tblSource] PRIMARY KEY CLUSTERED 
(
	[SourceId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[tblImport]    Script Date: 03/17/2019 21:11:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblImport](
	[ImportID] [int] IDENTITY(1,1) NOT NULL,
	[SourceID] [int] NULL,
	[ImportedOn] [datetime] NULL,
	[CreatedBy] [int] NULL,
 CONSTRAINT [PK_tblImport] PRIMARY KEY CLUSTERED 
(
	[ImportID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblPrivileges]    Script Date: 03/17/2019 21:11:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[tblPrivileges](
	[PrivilegeID] [int] IDENTITY(1,1) NOT NULL,
	[PrivilegeName] [varchar](50) NULL,
	[Description] [varchar](500) NULL,
	[CreateDate] [datetime] NULL,
 CONSTRAINT [PK_tblPrivileges] PRIMARY KEY CLUSTERED 
(
	[PrivilegeID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[tblUserPrivileges]    Script Date: 03/17/2019 21:11:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblUserPrivileges](
	[UserPrivilegeID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NOT NULL,
	[PrivilegeID] [int] NOT NULL,
	[CreateDate] [datetime] NULL,
 CONSTRAINT [PK_tblUserPrivileges] PRIMARY KEY CLUSTERED 
(
	[UserPrivilegeID] ASC,
	[UserID] ASC,
	[PrivilegeID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblProfile]    Script Date: 03/17/2019 21:11:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[tblProfile](
	[ProfileID] [int] IDENTITY(1,1) NOT NULL,
	[ImportID] [int] NULL,
	[FirstName] [varchar](50) NULL,
	[LastName] [varchar](50) NULL,
	[Phone] [varchar](15) NULL,
	[Email] [varchar](100) NULL,
	[Status] [int] NULL,
	[CreatedBy] [int] NULL,
	[CreateDate] [datetime] NULL,
	[UpdateDate] [datetime] NULL,
 CONSTRAINT [PK_tblProfile] PRIMARY KEY CLUSTERED 
(
	[ProfileID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[tblLeads]    Script Date: 03/17/2019 21:11:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblLeads](
	[LeadID] [int] IDENTITY(1,1) NOT NULL,
	[ProfileID] [int] NOT NULL,
	[MappedUserID] [int] NOT NULL,
	[IsActive] [bit] NULL,
	[CreateDate] [datetime] NULL,
	[CreatedBy] [int] NULL,
 CONSTRAINT [PK_tblLeads_1] PRIMARY KEY CLUSTERED 
(
	[LeadID] ASC,
	[ProfileID] ASC,
	[MappedUserID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblProfileNotes]    Script Date: 03/17/2019 21:11:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[tblProfileNotes](
	[NotesId] [int] IDENTITY(1,1) NOT NULL,
	[ProfileId] [int] NOT NULL,
	[Description] [varchar](500) NULL,
	[AddedBy] [int] NULL,
	[AddedOn] [datetime] NULL,
 CONSTRAINT [PK_tblProfileNotes] PRIMARY KEY CLUSTERED 
(
	[NotesId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  ForeignKey [FK_tblLeads_tblProfile]    Script Date: 03/17/2019 21:11:40 ******/
ALTER TABLE [dbo].[tblLeads]  WITH CHECK ADD  CONSTRAINT [FK_tblLeads_tblProfile] FOREIGN KEY([ProfileID])
REFERENCES [dbo].[tblProfile] ([ProfileID])
GO
ALTER TABLE [dbo].[tblLeads] CHECK CONSTRAINT [FK_tblLeads_tblProfile]
GO
/****** Object:  ForeignKey [FK_tblLeads_tblUser]    Script Date: 03/17/2019 21:11:40 ******/
ALTER TABLE [dbo].[tblLeads]  WITH CHECK ADD  CONSTRAINT [FK_tblLeads_tblUser] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[tblUser] ([UserID])
GO
ALTER TABLE [dbo].[tblLeads] CHECK CONSTRAINT [FK_tblLeads_tblUser]
GO
/****** Object:  ForeignKey [FK_tblLeads_tblUser1]    Script Date: 03/17/2019 21:11:40 ******/
ALTER TABLE [dbo].[tblLeads]  WITH CHECK ADD  CONSTRAINT [FK_tblLeads_tblUser1] FOREIGN KEY([MappedUserID])
REFERENCES [dbo].[tblUser] ([UserID])
GO
ALTER TABLE [dbo].[tblLeads] CHECK CONSTRAINT [FK_tblLeads_tblUser1]
GO
/****** Object:  ForeignKey [FK_tblProfile_tblImport]    Script Date: 03/17/2019 21:11:40 ******/
ALTER TABLE [dbo].[tblProfile]  WITH CHECK ADD  CONSTRAINT [FK_tblProfile_tblImport] FOREIGN KEY([ImportID])
REFERENCES [dbo].[tblImport] ([ImportID])
GO
ALTER TABLE [dbo].[tblProfile] CHECK CONSTRAINT [FK_tblProfile_tblImport]
GO
/****** Object:  ForeignKey [FK_tblProfile_tblStatus]    Script Date: 03/17/2019 21:11:40 ******/
ALTER TABLE [dbo].[tblProfile]  WITH CHECK ADD  CONSTRAINT [FK_tblProfile_tblStatus] FOREIGN KEY([Status])
REFERENCES [dbo].[tblStatus] ([StatusID])
GO
ALTER TABLE [dbo].[tblProfile] CHECK CONSTRAINT [FK_tblProfile_tblStatus]
GO
/****** Object:  ForeignKey [FK_tblProfile_tblUser]    Script Date: 03/17/2019 21:11:40 ******/
ALTER TABLE [dbo].[tblProfile]  WITH CHECK ADD  CONSTRAINT [FK_tblProfile_tblUser] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[tblUser] ([UserID])
GO
ALTER TABLE [dbo].[tblProfile] CHECK CONSTRAINT [FK_tblProfile_tblUser]
GO
/****** Object:  ForeignKey [FK_tblProfileNotes_tblProfile]    Script Date: 03/17/2019 21:11:40 ******/
ALTER TABLE [dbo].[tblProfileNotes]  WITH CHECK ADD  CONSTRAINT [FK_tblProfileNotes_tblProfile] FOREIGN KEY([ProfileId])
REFERENCES [dbo].[tblProfile] ([ProfileID])
GO
ALTER TABLE [dbo].[tblProfileNotes] CHECK CONSTRAINT [FK_tblProfileNotes_tblProfile]
GO
/****** Object:  ForeignKey [FK_tblUserPrivileges_tblPrivileges]    Script Date: 03/17/2019 21:11:40 ******/
ALTER TABLE [dbo].[tblUserPrivileges]  WITH CHECK ADD  CONSTRAINT [FK_tblUserPrivileges_tblPrivileges] FOREIGN KEY([PrivilegeID])
REFERENCES [dbo].[tblPrivileges] ([PrivilegeID])
GO
ALTER TABLE [dbo].[tblUserPrivileges] CHECK CONSTRAINT [FK_tblUserPrivileges_tblPrivileges]
GO
/****** Object:  ForeignKey [FK_tblUserPrivileges_tblUser]    Script Date: 03/17/2019 21:11:40 ******/
ALTER TABLE [dbo].[tblUserPrivileges]  WITH CHECK ADD  CONSTRAINT [FK_tblUserPrivileges_tblUser] FOREIGN KEY([UserID])
REFERENCES [dbo].[tblUser] ([UserID])
GO
ALTER TABLE [dbo].[tblUserPrivileges] CHECK CONSTRAINT [FK_tblUserPrivileges_tblUser]
GO
